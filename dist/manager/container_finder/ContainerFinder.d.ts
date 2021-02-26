import { ContainerIdProvider } from "../../provider/container_id/ContainerIdProvider";
import { InspectProvider } from "../../provider/inspect/InspectProvider";
import { Logger } from "../../utils/log/Logger";
import { Container } from "../../model/container/Container";
import { ContainerDefinition } from "../../model/container_definition/ContainerDefinition";
declare class ContainerFinder {
    private containerIdProvider;
    private inspectProvider;
    private logger;
    constructor(containerIdProvider: ContainerIdProvider, inspectProvider: InspectProvider, logger: Logger);
    private getState;
    private getContainerFromInspect;
    private getNotFoundContainer;
    private getContainerById;
    getContainerByImage(image: string): Promise<Container>;
    getContainerByDefinition(definition: ContainerDefinition): Promise<Container>;
}
export { ContainerFinder };
