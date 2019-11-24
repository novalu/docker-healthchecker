import { ContainerIdProvider } from "../../provider/container_id/ContainerIdProvider";
import { InspectProvider } from "../../provider/inspect/InspectProvider";
import { Logger } from "../../utils/log/Logger";
import { Container } from "../../model/container/Container";
import { ContainerRequest } from "../../model/configuration/ContainerRequest";
declare class ContainerGetter {
    private containerIdProvider;
    private inspectProvider;
    private logger;
    constructor(containerIdProvider: ContainerIdProvider, inspectProvider: InspectProvider, logger: Logger);
    private getHealth;
    private getContainerFromInspect;
    getContainer(container: ContainerRequest | string): Promise<Container>;
}
export { ContainerGetter };
