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
import { LoggerMessageConfig } from "./model/message_config/impl/LoggerMessageConfig";
import {Configuration} from "./model/configuration/Configuration";
import {ConfigurationProcessor} from "./manager/configuration_processor/ConfigurationProcessor";

@injectable()
class App {

    constructor(
        @inject(TYPES.ContainerChecker) private containerChecker: ContainerChecker,
        @inject(TYPES.ContainerIdProvider) private containerIdProvider: ContainerIdProvider,
        @inject(TYPES.InspectProvider) private inspectProvider: InspectProvider,
        @inject(TYPES.ConfigurationProcessor) private configurationProcessor: ConfigurationProcessor,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    public async start(configuration: Configuration): Promise<boolean> {
        const containers = await this.configurationProcessor.processConfig(configuration);

        const messageConfigs = [ new LoggerMessageConfig(true) ];
        this.containerChecker.checkContainers(containers, messageConfigs);

        //const containerId = await this.containerIdProvider.getContainerIdByImage("test:latest");
        //this.logger.info(containerId);

        //await this.inspectProvider.getInspectForId("17fba8182cbb");

        return true;
    }

}

export { App }