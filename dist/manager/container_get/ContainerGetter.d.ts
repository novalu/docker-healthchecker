import { ContainerIdProvider } from "../../provider/container_id/ContainerIdProvider";
import { InspectProvider } from "../../provider/inspect/InspectProvider";
import { Logger } from "../../utils/log/Logger";
import { Container } from "../../model/container/Container";
declare class ContainerGetter {
    private containerIdProvider;
    private inspectProvider;
    private logger;
    constructor(containerIdProvider: ContainerIdProvider, inspectProvider: InspectProvider, logger: Logger);
    private getContainerFromInspect;
    getContainer(image: string): Promise<Container>;
}
export { ContainerGetter };
