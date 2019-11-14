import { Logger } from "./utils/log/Logger";
import { ContainerGetter } from "./manager/container_get/ContainerGetter";
import { ContainerChecker } from "./manager/container_checker/ContainerChecker";
declare class Cli {
    private containerGetter;
    private containerChecker;
    private logger;
    constructor(containerGetter: ContainerGetter, containerChecker: ContainerChecker, logger: Logger);
    start(): Promise<boolean>;
}
export { Cli };
