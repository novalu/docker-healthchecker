import yargs from "yargs";
import {inject, injectable} from "inversify";
import Joi from "joi";

import TYPES from "./di/types";
import {Logger} from "./utils/log/Logger";
import {ContainerStateMonitor} from "./manager/container_state_monitor/ContainerStateMonitor";
import {ContainersProcessor} from "./manager/containers_processor/ContainersProcessor";
import {PlainConfiguration} from "./model/configuration/impl/PlainConfiguration";
import {FileConfiguration} from "./model/configuration/impl/FileConfiguration";
import {ConsoleConsumerOptions} from "./model/consumer_options/impl/ConsoleConsumerOptions";
import {SlackConsumerOptions} from "./model/consumer_options/impl/SlackConsumerOptions";

@injectable()
class App {
  constructor(
    @inject(TYPES.ContainerStateMonitor) private containerStateMonitor: ContainerStateMonitor,
    @inject(TYPES.ContainersProcessor) private containersProcessor: ContainersProcessor,
    @inject(TYPES.Logger) private logger: Logger
  ) {
  }

  public async start(): Promise<boolean> {
    const argv = yargs
      .help("h")
      .alias("h", "help")

      .group(["image", "file"], "Definition:")
      .options({
        i: {
          alias: "image",
          describe: "Docker image to check. Could be defined more times.",
          array: true,
          string: true
        },
        f: {
          alias: "file",
          describe: "JSON file with image definition in format [{name: string, image: string, alias: " +
            "string}, ...], where there should be at least name or image. Alias is optional.",
          type: "string",
          nargs: 1
        }
      })
      .group(["console", "slack", "slack-webhook"], "Output:")
      .options({
        c: {
          alias: "console",
          describe: "Whether program should output to console"
        },
        s: {
          alias: "slack",
          describe: "Whether program should send Slack notification"
        },
        slackWebhook: {
          describe: "If slack output is enabled, define the Slack webhook URL",
          nargs: 1
        },
        force: {
          describe: "Whether program should output even if containers are up"
        }
      })

      .fail((msg, err) => {
        this.logger.error("Failed validate CLI parameters", err);
        process.exit(1)
      })

      .argv;

    // this.logger.debug("Yargs:");
    // this.logger.debug(JSON.stringify(argv));

    const schema = Joi.object({
      image: Joi.array().items(Joi.string()),
      file: Joi.string(),
      force: Joi.bool().default(false),
      console: Joi.bool().default(false),
      slack: Joi.bool().default(false),
      slackWebhook: Joi.string().default("").uri().when("slack", {is: true, then: Joi.required()})
    });

    const options = schema.validate(argv, {allowUnknown: true});
    if (options.error) {
      this.logger.error("Failed validate CLI parameters", options.error);
      process.exit(1);
    }

    const image = options.value.image;
    const file = options.value.file;
    const force = options.value.force;
    const consoleVal = options.value.console;
    const slack = options.value.slack;
    const slackWebhook = options.value.slackWebhook;

    // this.logger.debug("Joi:");
    // this.logger.debug(JSON.stringify({image, file, force, console: consoleVal, slack, slackWebhook}));

    if ((!image && !file) || (image && file)) {
      this.logger.error("Only one of image and file should be provided");
    }

    if (!consoleVal && !slack) {
      this.logger.error("Console or Slack output should be provided");
    }

    const consumerOptions = [];
    if (consoleVal) consumerOptions.push(new ConsoleConsumerOptions(force))
    if (slack) consumerOptions.push(new SlackConsumerOptions(slackWebhook, force))

    let configuration;
    if (image !== undefined && image.length > 0) {
      configuration = new PlainConfiguration(image, consumerOptions);
    } else if (file) {
      configuration = new FileConfiguration(file, consumerOptions);
    }

    const containers = await this.containersProcessor.process(configuration);

    await this.containerStateMonitor.processState(containers, configuration);

    return true;
  }

}

export {App}