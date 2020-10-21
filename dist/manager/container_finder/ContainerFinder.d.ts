import { ContainerIdProvider } from "../../provider/container_id/ContainerIdProvider";
import { InspectProvider } from "../../provider/inspect/InspectProvider";
import { Logger } from "../../utils/log/Logger";
import { Container } from "../../model/container/Container";
import { ContainerRequest } from "../containers_processor/configuration/ContainerRequest";
declare class ContainerFinder {
    private containerIdProvider;
    private inspectProvider;
    private logger;
    constructor(containerIdProvider: ContainerIdProvider, inspectProvider: InspectProvider, logger: Logger);
    private getHealth;
    private getContainerFromInspect;
    findContainer(container: ContainerRequest | string): Promise<Container>;
}
export { ContainerFinder };
