#!/usr/bin/env node

import "reflect-metadata";
import container from "./di/container";
import TYPES from "./di/types";
import PrettyError from "pretty-error";
import {Cli} from "./Cli";
import {Logger} from "./utils/log/Logger";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import {ConsoleLogger} from "./utils/log/impl/ConsoleLogger";

async function startCli(): Promise<Cli> {
    container.bind<Logger>(TYPES.Logger).to(ConsoleLogger);

    const cli = container.get<Cli>(TYPES.Cli);
    const started = await cli.start();
    return started ? cli : undefined;
}

(async () => {
    let app;
    try {
        app = await startCli();
    } catch (err) {
        const msg = "Cannot start application";
        if (app) {
            app.logger.fatal(msg, err);
        } else {
            const pe = new PrettyError();
            // tslint:disable-next-line:no-console
            console.error(`${msg}, error: ${pe.render(err)}`);
        }
    }
})();