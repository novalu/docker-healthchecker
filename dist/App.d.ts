import { Logger } from "./utils/log/Logger";
import { ContainerChecker } from "./manager/container_checker/ContainerChecker";
import { ContainerIdProvider } from "./provider/container_id/ContainerIdProvider";
import { InspectProvider } from "./provider/inspect/InspectProvider";
import { Configuration } from "./model/configuration/Configuration";
import { ConfigurationProcessor } from "./manager/configuration_processor/ConfigurationProcessor";
declare class App {
    private containerChecker;
    private containerIdProvider;
    private inspectProvider;
    private configurationProcessor;
    private logger;
    constructor(containerChecker: ContainerChecker, containerIdProvider: ContainerIdProvider, inspectProvider: InspectProvider, configurationProcessor: ConfigurationProcessor, logger: Logger);
    start(configuration: Configuration): Promise<boolean>;
}
export { App };
