import "reflect-metadata";
import container from "./di/container";
import TYPES from "./di/types";
import PrettyError from "pretty-error";

import { App } from "./App";
import {Logger} from "./utils/log/Logger";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";
import {NoOpLogger} from "./utils/log/impl/NoOpLogger";
import { Configuration } from "./manager/containers_processor/configuration/Configuration";

async function startApp(configuration: Configuration): Promise<App> {
    container.bind<Logger>(TYPES.Logger).to(SignaleLogger);

    const app = container.get<App>(TYPES.App);
    const started = await app.start(configuration);
    return started ? app : undefined;
}

(async () => {
    let app;
    try {
        const configuration = new Configuration(
          ["test"], "images-def-example.json"
        );
        app = await startApp(configuration);
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