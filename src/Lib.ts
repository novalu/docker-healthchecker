import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import {Logger} from "./utils/log/Logger";
import {ContainerChecker} from "./manager/container_checker/ContainerChecker";
import {ContainerGetter} from "./manager/container_get/ContainerGetter";
import {ContainerIdProvider} from "./provider/container_id/ContainerIdProvider";
import {InspectProvider} from "./provider/inspect/InspectProvider";
import container from "./di/container";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";
import { Container } from "./model/container/Container";
import {Configuration} from "./model/configuration/Configuration";
import {ConfigurationProcessor} from "./manager/configuration_processor/ConfigurationProcessor";

@injectable()
class Lib {

    constructor(
        @inject(TYPES.ConfigurationProcessor) private configurationProcessor: ConfigurationProcessor,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    public async get(configuration: Configuration): Promise<Container[]> {
        const containers = await this.configurationProcessor.processConfig(configuration);
        return containers;
    }

}

export { Lib }