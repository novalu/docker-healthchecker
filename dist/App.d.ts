import { Logger } from "./utils/log/Logger";
import { ContainerStateMonitor } from "./manager/container_state_monitor/ContainerStateMonitor";
import { ContainersProcessor } from "./manager/containers_processor/ContainersProcessor";
declare class App {
    private containerStateMonitor;
    private containersProcessor;
    private logger;
    constructor(containerStateMonitor: ContainerStateMonitor, containersProcessor: ContainersProcessor, logger: Logger);
    start(): Promise<boolean>;
}
export { App };
