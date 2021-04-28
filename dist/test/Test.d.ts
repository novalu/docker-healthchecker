import { Logger } from "../utils/log/Logger";
import { ContainerIdProvider } from "../provider/container_id/ContainerIdProvider";
import { InspectProvider } from "../provider/inspect/InspectProvider";
import { ContainerStateMonitor } from "../manager/container_state_monitor/ContainerStateMonitor";
import { ContainersProcessor } from "../manager/containers_processor/ContainersProcessor";
import { Configuration } from "../model/configuration/Configuration";
declare class Test {
    private containerStateMonitor;
    private containerIdProvider;
    private inspectProvider;
    private containersProcessor;
    private logger;
    constructor(containerStateMonitor: ContainerStateMonitor, containerIdProvider: ContainerIdProvider, inspectProvider: InspectProvider, containersProcessor: ContainersProcessor, logger: Logger);
    start(configuration: Configuration): Promise<boolean>;
}
export { Test };
