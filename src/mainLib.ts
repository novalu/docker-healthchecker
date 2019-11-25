import "reflect-metadata";
import container from "./di/container";
import TYPES from "./di/types";
import PrettyError from "pretty-error";

import { App } from "./App";
import {Logger} from "./utils/log/Logger";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import { Lib } from "./Lib";
import { Container } from "./model/container/Container";
import {ConsoleLogger} from "./utils/log/impl/ConsoleLogger";
import { ContainerState} from "./model/container_state/ContainerState";
import { Configuration } from "./manager/containers_processor/configuration/Configuration";
import { ContainerRequest } from "./manager/containers_processor/configuration/ContainerRequest";

const containersHealth = async function containersHealth(configuration: Configuration): Promise<Container[]> {
    container.bind<Logger>(TYPES.Logger).to(ConsoleLogger);

    const lib = container.get<Lib>(TYPES.Lib);
    return await lib.check(configuration);
}

export { containersHealth, Container, ContainerState, Configuration, ContainerRequest }