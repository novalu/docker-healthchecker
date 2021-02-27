import "reflect-metadata";
import PrettyError from "pretty-error";

import { Test } from "./Test";
import { Configuration } from "../model/configuration/Configuration";
import container from "../di/container";
import { Logger } from "../utils/log/Logger";
import TYPES from "../di/types";
import { SignaleLogger } from "../utils/log/impl/SignaleLogger";
import { LoggerConsumerOptions } from "../model/consumer_options/impl/LoggerConsumerOptions";
import { FileConfiguration } from "../model/configuration/impl/FileConfiguration";

async function start(configuration: Configuration): Promise<Test> {
    container.bind<Logger>(TYPES.Logger).to(SignaleLogger);

    const app = container.get<Test>(TYPES.App);
    const started = await app.start(configuration);
    return started ? app : undefined;
}

(async () => {
    let app;
    try {
        const consumerOptions = [ new LoggerConsumerOptions(true) ];
        // const configuration = new PlainConfiguration(
        //   ["mongo-festapp-nocvedcu-local"], consumerOptions
        // );
        const configuration = new FileConfiguration(
            "definition-example-test.json", consumerOptions
        )
        app = await start(configuration);
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