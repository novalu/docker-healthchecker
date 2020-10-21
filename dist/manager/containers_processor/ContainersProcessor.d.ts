import { Container } from "../../model/container/Container";
import { Logger } from "../../utils/log/Logger";
import { ContainerFinder } from "../container_finder/ContainerFinder";
import { Configuration } from "./configuration/Configuration";
declare class ContainersProcessor {
    private containerFinder;
    private logger;
    constructor(containerFinder: ContainerFinder, logger: Logger);
    private getImagesSchema;
    private processImagesFile;
    process(configuration: Configuration): Promise<Container[]>;
}
export { ContainersProcessor };
