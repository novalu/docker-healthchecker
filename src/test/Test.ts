import {inject, injectable} from "inversify";
import TYPES from "../di/types";
import {Logger} from "../utils/log/Logger";
import {ContainerIdProvider} from "../provider/container_id/ContainerIdProvider";
import {InspectProvider} from "../provider/inspect/InspectProvider";
import {ContainerStateMonitor} from "../manager/container_state_monitor/ContainerStateMonitor";
import {ContainersProcessor} from "../manager/containers_processor/ContainersProcessor";
import {Configuration} from "../model/configuration/Configuration";

@injectable()
class Test {

  constructor(
    @inject(TYPES.ContainerStateMonitor) private containerStateMonitor: ContainerStateMonitor,
    @inject(TYPES.ContainerIdProvider) private containerIdProvider: ContainerIdProvider,
    @inject(TYPES.InspectProvider) private inspectProvider: InspectProvider,
    @inject(TYPES.ContainersProcessor) private containersProcessor: ContainersProcessor,
    @inject(TYPES.Logger) private logger: Logger
  ) {
  }

  public async start(configuration: Configuration): Promise<boolean> {
    const containers = await this.containersProcessor.process(configuration);

    this.containerStateMonitor.processState(containers, configuration);

    //const containerId = await this.containerIdProvider.getContainerIdByImage("test:latest");
    //this.logger.info(containerId);

    //await this.inspectProvider.getInspectForId("17fba8182cbb");

    return true;
  }

}

export {Test}