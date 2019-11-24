import { Logger } from "./utils/log/Logger";
import { ContainerChecker } from "./manager/container_checker/ContainerChecker";
import { ConfigurationProcessor } from "./manager/configuration_processor/ConfigurationProcessor";
declare class Cli {
    private containerChecker;
    private configurationProcessor;
    private logger;
    constructor(containerChecker: ContainerChecker, configurationProcessor: ConfigurationProcessor, logger: Logger);
    start(): Promise<boolean>;
}
export { Cli };
