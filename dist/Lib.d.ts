import { Logger } from "./utils/log/Logger";
import { ContainerGetter } from "./manager/container_get/ContainerGetter";
import { Container } from "./model/container/Container";
declare class Lib {
    private containerGetter;
    private logger;
    constructor(containerGetter: ContainerGetter, logger: Logger);
    get(images: string[]): Promise<Container[]>;
}
export { Lib };
