import {inject, injectable} from "inversify";
import TYPES from "../../di/types";
import {ContainerIdProvider} from "../../provider/container_id/ContainerIdProvider";
import {InspectProvider} from "../../provider/inspect/InspectProvider";
import {Logger} from "../../utils/log/Logger";
import { Container } from "../../model/container/Container";
import {TimeUtils} from "../../utils/TimeUtils";

@injectable()
class ContainerGetter {

    constructor(
        @inject(TYPES.ContainerIdProvider) private containerIdProvider: ContainerIdProvider,
        @inject(TYPES.InspectProvider) private inspectProvider: InspectProvider,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    private getHealth(parsedContainer: any): number {
        if (parsedContainer.State.Health) {
            const healthStatus = parsedContainer.State.Health.Status;
            switch (healthStatus) {
                case "healthy":
                    return Container.STATUS_RUNNING_HEALTHY;
                    break;
                case "unhealthy":
                    return Container.STATUS_RUNNING_UNHEALTHY;
                    break;
                case "starting":
                    return Container.STATUS_RUNNING_STARTING;
                    break;
            }
        } else {
            return Container.STATUS_RUNNING_UNKNOWN;
        }
    }

    private getContainerFromInspect(inspect: string): Container {
        const parsedInspect = JSON.parse(inspect);
        const parsedContainer = parsedInspect[0];
        const id = (parsedContainer.Id as string).substr(12);
        const image = parsedContainer.Config.Image;
        const health = this.getHealth(parsedContainer);
        const startedAt = TimeUtils.moment(parsedContainer.State.StartedAt);
        const container = new Container(id, image, health, startedAt);
        return container;
    }

    public async getContainer(image: string): Promise<Container> {
        const containerId = await this.containerIdProvider.getContainerIdByImage(image);
        if (containerId !== undefined) {
            const inspectOutput = await this.inspectProvider.getInspectForId(containerId);
            if (inspectOutput !== undefined) {
                return this.getContainerFromInspect(inspectOutput);
            } else {
                this.logger.warn(`Cannot inspect container from image ${image}.`);
            }
        } else {
            this.logger.warn(`Container for image ${image} not found.`);
        }
        return new Container("n/a", image, Container.STATUS_DOWN, undefined);
    }

}

export { ContainerGetter }