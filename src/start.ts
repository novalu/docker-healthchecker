#!/usr/bin/env node

import "reflect-metadata";
import container from "./di/container";
import TYPES from "./di/types";
import {App} from "./App";
import {Logger} from "./utils/log/Logger";
import {SignaleLogger} from "./utils/log/impl/SignaleLogger";

async function start(): Promise<App> {
  container.bind<Logger>(TYPES.Logger).to(SignaleLogger);

  const cli = container.get<App>(TYPES.App);
  const started = await cli.start();
  return started ? cli : undefined;
}

(async () => {
  let app;
  try {
    app = await start();
  } catch (err) {
    const msg = "Cannot start application";
    if (app) {
      app.logger.fatal(msg, err);
    } else {
      // tslint:disable-next-line:no-console
      console.error(`${msg}: ${err.message}`);
    }
  }
})();