import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import {Logger} from "./utils/log/Logger";
import {ContainerChecker} from "./manager/container_checker/ContainerChecker";
import {ContainerGetter} from "./manager/container_get/ContainerGetter";
import {ContainerIdProvider} from "./provider/container_id/ContainerIdProvider";
import {InspectProvider} from "./provider/inspect/InspectProvider";
import container from "./di/container";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";
import { Container } from "./model/container/Container";

@injectable()
class Lib {

    constructor(
        @inject(TYPES.ContainerGetter) private containerGetter: ContainerGetter,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    public async get(...images: string[]): Promise<Container[]> {
        const containers = [];
        for (const image of images) {
            const container = await this.containerGetter.getContainer(image);
            containers.push(container);
        }
        return containers;
    }

}

export { Lib }