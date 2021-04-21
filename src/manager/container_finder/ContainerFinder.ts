import {inject, injectable} from "inversify";
import TYPES from "../../di/types";
import {ContainerIdProvider} from "../../provider/container_id/ContainerIdProvider";
import {InspectProvider} from "../../provider/inspect/InspectProvider";
import {Logger} from "../../utils/log/Logger";
import {Container} from "../../model/container/Container";
import {TimeUtils} from "../../utils/TimeUtils";
import {ContainerState} from "../../model/container_state/ContainerState";
import {ContainerDefinition} from "../../model/container_definition/ContainerDefinition";

@injectable()
class ContainerFinder {

  constructor(
    @inject(TYPES.ContainerIdProvider) private containerIdProvider: ContainerIdProvider,
    @inject(TYPES.InspectProvider) private inspectProvider: InspectProvider,
    @inject(TYPES.Logger) private logger: Logger
  ) {
  }

  private getState(parsedContainer: any): ContainerState {
    if (parsedContainer.State.Health) {
      const healthStatus = parsedContainer.State.Health.Status;
      switch (healthStatus) {
        case "healthy":
          return ContainerState.RUNNING_HEALTHY;
          break;
        case "unhealthy":
          return ContainerState.RUNNING_UNHEALTHY;
          break;
        case "starting":
          return ContainerState.RUNNING_STARTING;
          break;
      }
    } else {
      return ContainerState.RUNNING_UNKNOWN;
    }
  }

  private getContainerFromInspect(inspectData: string, alias: string): Container {
    const parsedInspect = JSON.parse(inspectData);
    const parsedContainer = parsedInspect[0];
    const id = (parsedContainer.Id as string).substr(12);
    const name = (parsedContainer.Name as string).substr(1);
    const image = (parsedContainer.Config.Image as string);
    const state = this.getState(parsedContainer);
    const startedAt = TimeUtils.moment(parsedContainer.State.StartedAt);
    return new Container(id, name, image, alias, state, startedAt);
  }

  private getNotFoundContainer(image: string, name: string, alias: string): Container {
    return new Container(undefined, name, image, alias, ContainerState.NOT_FOUND, undefined);
  }

  private async getContainerById(containerId: string, alias: string): Promise<Container> {
    const inspectOutput = await this.inspectProvider.getInspectForId(containerId);
    if (inspectOutput !== undefined) {
      return this.getContainerFromInspect(inspectOutput, alias);
    } else {
      this.logger.warn(`Cannot inspect container from image ${alias}.`);
    }
    return undefined;
  }

  public async getContainerByImage(image: string): Promise<Container> {
    const containerId = await this.containerIdProvider.getContainerIdByImage(image);
    if (containerId !== undefined) {
      return this.getContainerById(containerId, image);
    } else {
      this.logger.warn(`Container for image ${image} not found.`);
      return this.getNotFoundContainer(image, "", image);
    }
  }

  public async getContainerByDefinition(definition: ContainerDefinition): Promise<Container> {
    let containerId: string;
    if (definition.name) {
      containerId = await this.containerIdProvider.getContainerIdByName(definition.name);
    } else if (definition.image) {
      containerId = await this.containerIdProvider.getContainerIdByImage(definition.image);
    }
    if (containerId !== undefined) {
      return this.getContainerById(containerId, definition.alias);
    } else {
      this.logger.warn(`Container for image ${definition.alias} not found.`);
      return this.getNotFoundContainer(definition.image, definition.name, definition.alias);
    }
  }

}

export {ContainerFinder}