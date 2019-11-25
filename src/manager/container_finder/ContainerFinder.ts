import {inject, injectable} from "inversify";
import TYPES from "../../di/types";
import {ContainerIdProvider} from "../../provider/container_id/ContainerIdProvider";
import {InspectProvider} from "../../provider/inspect/InspectProvider";
import {Logger} from "../../utils/log/Logger";
import { Container } from "../../model/container/Container";
import {TimeUtils} from "../../utils/TimeUtils";
import { ContainerState } from "../../model/container_state/ContainerState";
import { ContainerRequest } from "../containers_processor/configuration/ContainerRequest";

@injectable()
class ContainerFinder {

    constructor(
        @inject(TYPES.ContainerIdProvider) private containerIdProvider: ContainerIdProvider,
        @inject(TYPES.InspectProvider) private inspectProvider: InspectProvider,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    private getHealth(parsedContainer: any): ContainerState {
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

    private getContainerFromInspect(inspect: string, image: string, alias: string): Container {
        const parsedInspect = JSON.parse(inspect);
        const parsedContainer = parsedInspect[0];
        const id = (parsedContainer.Id as string).substr(12);
        const health = this.getHealth(parsedContainer);
        const startedAt = TimeUtils.moment(parsedContainer.State.StartedAt);
        const container = new Container(id, image, alias, health, startedAt);
        return container;
    }

    public async findContainer(container: ContainerRequest | string): Promise<Container> {
        const image = container instanceof ContainerRequest ? container.image : container;
        const alias = container instanceof ContainerRequest ? container.alias : container;
        const containerId = await this.containerIdProvider.getContainerIdByImage(image);
        if (containerId !== undefined) {
            const inspectOutput = await this.inspectProvider.getInspectForId(containerId);
            if (inspectOutput !== undefined) {
                return this.getContainerFromInspect(inspectOutput, image, alias);
            } else {
                this.logger.warn(`Cannot inspect container from image ${image}.`);
            }
        } else {
            this.logger.warn(`Container for image ${image} not found.`);
        }
        return new Container("n/a", image, alias, ContainerState.DOWN, undefined);
    }

}

export { ContainerFinder }