import { Logger } from "./utils/log/Logger";
import { Container } from "./model/container/Container";
import { ContainersProcessor } from "./manager/containers_processor/ContainersProcessor";
import { Configuration } from "./manager/containers_processor/configuration/Configuration";
import { ContainerStateMonitor } from "./manager/container_state_monitor/ContainerStateMonitor";
declare class Lib {
    private containersProcessor;
    private containerStateMonitor;
    private logger;
    constructor(containersProcessor: ContainersProcessor, containerStateMonitor: ContainerStateMonitor, logger: Logger);
    check(configuration: Configuration): Promise<Container[]>;
}
export { Lib };
