import { Logger } from "./utils/log/Logger";
import { Container } from "./model/container/Container";
import { Configuration } from "./model/configuration/Configuration";
import { ConfigurationProcessor } from "./manager/configuration_processor/ConfigurationProcessor";
declare class Lib {
    private configurationProcessor;
    private logger;
    constructor(configurationProcessor: ConfigurationProcessor, logger: Logger);
    get(configuration: Configuration): Promise<Container[]>;
}
export { Lib };
