import {inject, injectable} from "inversify";
import TYPES from "../../di/types";
import {ContainerIdProvider} from "../../provider/container_id/ContainerIdProvider";
import {InspectProvider} from "../../provider/inspect/InspectProvider";
import {Logger} from "../../utils/log/Logger";
import { Container } from "../../model/container/Container";

@injectable()
class ContainerGetter {

    constructor(
        @inject(TYPES.ContainerIdProvider) private containerIdProvider: ContainerIdProvider,
        @inject(TYPES.InspectProvider) private inspectProvider: InspectProvider,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    private getContainerFromInspect(inspect: string): Container {
        const parsed = JSON.parse(inspect);
        const rawContainer = parsed[0];
        const id = (rawContainer.Id as string).substr(12);
        const image = rawContainer.Config.Image;
        const healthStatus = rawContainer.State.Health.Status;
        let health;
        switch (healthStatus) {
            case "healthy": health = Container.STATUS_HEALTHY; break;
            case "unhealthy": health = Container.STATUS_UNHEALTHY; break;
            case "starting": health = Container.STATUS_STARTING; break;
        }
        const container = new Container(id, image, health);
        return container;
    }

    public async getContainer(image: string): Promise<Container> {
        const containerId = await this.containerIdProvider.getContainerIdByImage(image);
        if (containerId !== undefined) {
            const inspectOutput = await this.inspectProvider.getInspectForId(containerId);
            if (inspectOutput !== undefined) {
                const container = this.getContainerFromInspect(inspectOutput);
                return container;
            } else {
                this.logger.warn(`Cannot get inspect ouput for container from image ${image}`);
                return new Container("n/a", image, Container.STATUS_DOWN);
            }
        } else {
            this.logger.warn(`Container for image ${image} not found`);
            return new Container("n/a", image, Container.STATUS_DOWN);
        }

    }

}

export { ContainerGetter }