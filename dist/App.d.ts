import { Logger } from "./utils/log/Logger";
import { ContainerChecker } from "./manager/container_checker/ContainerChecker";
import { ContainerGetter } from "./manager/container_get/ContainerGetter";
import { ContainerIdProvider } from "./provider/container_id/ContainerIdProvider";
import { InspectProvider } from "./provider/inspect/InspectProvider";
declare class App {
    private containerGetter;
    private containerChecker;
    private containerIdProvider;
    private inspectProvider;
    private logger;
    constructor(containerGetter: ContainerGetter, containerChecker: ContainerChecker, containerIdProvider: ContainerIdProvider, inspectProvider: InspectProvider, logger: Logger);
    start(images: string[]): Promise<boolean>;
}
export { App };
