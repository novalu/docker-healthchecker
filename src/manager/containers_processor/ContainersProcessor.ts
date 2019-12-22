import {inject, injectable} from "inversify";
import {Container} from "../../model/container/Container";
import TYPES from "../../di/types";
import * as fs from "fs-extra";
import validator from "validator";
import Joi from "@hapi/joi";
import {Logger} from "../../utils/log/Logger";
import path from "path";
import { ContainerFinder } from "../container_finder/ContainerFinder";
import { ContainerRequest } from "./configuration/ContainerRequest";
import { Configuration } from "./configuration/Configuration";

@injectable()
class ContainersProcessor {

    constructor(
        @inject(TYPES.ContainerFinder) private containerFinder: ContainerFinder,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    private getImagesSchema(): any {
        return Joi.array().items(Joi.object({
            image: Joi.string().required(),
            alias: Joi.string()
        }));
    }

    private async processImagesFile(imagesFile: string): Promise<string[]> {
        const images = [];
        const exists = await fs.pathExists(imagesFile);
        if (exists) {
            const stat = await fs.stat(imagesFile);
            if (stat.isFile()) {
                const contents = (await fs.readFile(imagesFile)).toString();
                const isJson = validator.isJSON(contents);
                if (isJson) {
                    const imagesDef = JSON.parse(contents);
                    const imagesSchema = this.getImagesSchema();
                    const validationResult = imagesSchema.validate(imagesDef);
                    if (!validationResult.error) {
                        for (const imageDef of imagesDef) {
                            const alias = imageDef.alias ?? imageDef.image;
                            images.push(new ContainerRequest(imageDef.image, alias));
                        }
                        return images;
                    } else {
                        throw new Error("Images definition file has invalid content.");
                    }

                } else {
                    throw new Error("Images definition file is not a JSON.");
                }

            } else {
                throw new Error("Images definition is not a file.");
            }
        } else {
            throw new Error("Images definition file does not exist.")
        }
    }

    public async process(configuration: Configuration): Promise<Container[]> {
        const containers = [];
        const imagesResult = Joi.array().items(Joi.string()).validate(configuration.images);
        if (imagesResult.error) {
            throw new Error("Provided images are not valid");
        }
        const images = [...(configuration.images ?? [])];
        if (configuration.imagesDef) {
            images.push(...(await this.processImagesFile(configuration.imagesDef)));
        }
        for (const image of images) {
            containers.push(await this.containerFinder.findContainer(image));
        }
        return containers;
    }

}

export { ContainersProcessor }