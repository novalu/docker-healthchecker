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

export async function containersHealth(...images: string[]): Promise<Container[]> {
    container.bind<Logger>(TYPES.Logger).to(NoOpLogger);

    const lib = container.get<Lib>(TYPES.Lib);
    return await lib.get(...images);
}