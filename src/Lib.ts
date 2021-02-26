import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import {Logger} from "./utils/log/Logger";
import {ContainerIdProvider} from "./provider/container_id/ContainerIdProvider";
import {InspectProvider} from "./provider/inspect/InspectProvider";
import container from "./di/container";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";
import { Container } from "./model/container/Container";
import { ContainersProcessor } from "./manager/containers_processor/ContainersProcessor";
import {ContainerStateMonitor} from "./manager/container_state_monitor/ContainerStateMonitor";
import { Configuration } from "./model/configuration/Configuration";

@injectable()
class Lib {

    constructor(
        @inject(TYPES.ContainersProcessor) private containersProcessor: ContainersProcessor,
        @inject(TYPES.ContainerStateMonitor) private containerStateMonitor: ContainerStateMonitor,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    public async check(configuration: Configuration): Promise<Container[]> {
        const containers = await this.containersProcessor.process(configuration);

        await this.containerStateMonitor.processState(containers, configuration);

        return containers;
    }

}

export { Lib }