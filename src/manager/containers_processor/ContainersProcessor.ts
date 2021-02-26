import {inject, injectable} from "inversify";
import {Container} from "../../model/container/Container";
import TYPES from "../../di/types";
import * as fs from "fs-extra";
import validator from "validator";
import Joi from "@hapi/joi";
import {Logger} from "../../utils/log/Logger";
import path from "path";
import { ContainerFinder } from "../container_finder/ContainerFinder";
import { ContainerDefinition } from "../../model/container_definition/ContainerDefinition";
import { Configuration } from "../../model/configuration/Configuration";
import {PlainConfiguration} from "../../model/configuration/impl/PlainConfiguration";
import {FileConfiguration} from "../../model/configuration/impl/FileConfiguration";

@injectable()
class ContainersProcessor {

    constructor(
        @inject(TYPES.ContainerFinder) private containerFinder: ContainerFinder,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    private getDefinitionsSchema(): any {
        return Joi.array().items(Joi.object({
            image: Joi.string(),
            name: Joi.string(),
            alias: Joi.string().required()
        }));
    }

    private async processFile(filePath: string): Promise<ContainerDefinition[]> {
        const containerDefinitions = [];
        const exists = await fs.pathExists(filePath);
        if (exists) {
            const stat = await fs.stat(filePath);
            if (stat.isFile()) {
                const contents = (await fs.readFile(filePath)).toString();
                const isJson = validator.isJSON(contents);
                if (isJson) {
                    const definitions = JSON.parse(contents);
                    const schema = this.getDefinitionsSchema();
                    const validationResult = schema.validate(definitions);
                    if (!validationResult.error) {
                        for (const definition of definitions) {
                            containerDefinitions.push(new ContainerDefinition(definition.alias, definition.image, definition.name));
                        }
                    } else {
                        throw new Error("Definitions file has invalid content.");
                    }
                } else {
                    throw new Error("Definitions file content is not a JSON.");
                }
            } else {
                throw new Error("Definitions is not a file.");
            }
        } else {
            throw new Error("Definitions file does not exist.")
        }
        return containerDefinitions;
    }

    private async processFileConfiguration(configuration: FileConfiguration): Promise<Container[]> {
        const definitions = await this.processFile(configuration.filePath);
        const containers: Container[] = [];
        for (const definition of definitions) {
            const container = await this.containerFinder.getContainerByDefinition(definition);
            if (container) {
                containers.push(container);
            }
        }
        return containers;
    }

    private async processPlainConfiguration(configuration: PlainConfiguration): Promise<Container[]> {
        const images = configuration.images;
        const containers: Container[] = [];
        for (const image of images) {
            const container = await this.containerFinder.getContainerByImage(image);
            if (container) {
                containers.push(container);
            }
        }
        return containers;
    }

    public async process(configuration: Configuration): Promise<Container[]> {
        if (configuration.type === Configuration.TYPE_FILE) {
            return this.processFileConfiguration(configuration as FileConfiguration);
        } else if (configuration.type === Configuration.TYPE_PLAIN) {
            return this.processPlainConfiguration(configuration as PlainConfiguration)
        }
    }

}

export { ContainersProcessor }