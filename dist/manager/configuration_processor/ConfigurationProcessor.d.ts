import { Container } from "../../model/container/Container";
import { ContainerGetter } from "../container_get/ContainerGetter";
import { Logger } from "../../utils/log/Logger";
import { Configuration } from "../../model/configuration/Configuration";
declare class ConfigurationProcessor {
    private containerGetter;
    private logger;
    constructor(containerGetter: ContainerGetter, logger: Logger);
    private getImagesSchema;
    private processImagesFile;
    processConfig(configuration: Configuration): Promise<Container[]>;
}
export { ConfigurationProcessor };
