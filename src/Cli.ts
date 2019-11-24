import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import { Messenger } from "./manager/messenger/Messenger";
import {LoggerMessenger} from "./manager/messenger/impl/LoggerMessenger";
import { SlackMessenger } from "./manager/messenger/impl/SlackMessenger";
import {ContainerGetter} from "./manager/container_get/ContainerGetter";
import {ContainerChecker} from "./manager/container_checker/ContainerChecker";
import { ConsoleMessageConfig } from "./model/message_config/impl/ConsoleMessageConfig";
import { SlackMessageConfig } from "./model/message_config/impl/SlackMessageConfig";
import {ConfigurationProcessor} from "./manager/configuration_processor/ConfigurationProcessor";
import {Configuration} from "./model/configuration/Configuration";

@injectable()
class Cli {
    constructor(
        @inject(TYPES.ContainerChecker) private containerChecker: ContainerChecker,
        @inject(TYPES.ConfigurationProcessor) private configurationProcessor: ConfigurationProcessor,
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    public async start(): Promise<boolean> {
        const argv = yargs
            .help("h")
            .alias("h", "help")

            .group("image", "Images:")
            .alias("i", "image")
            .describe("image", "Docker image to check. Could be defined more times.")
            .array("image")
            .string("image")
            .describe("images-def", "JSON file with image definition in format [{image: string, alias: string}, ...]")
            .string("images-def")

            .group(["console-enabled", "console-force"], "Console output:")
            .describe("console-enabled", "Whether program should output to console")
            .describe("console-force", "Whether program should output even if containers are up")

            .group(["slack-enabled", "slack-webhook", "slack-force"], "Slack notification:")
            .describe("slack-enabled", "Whether program should send output to Slack")
            .describe("slack-webhook", "If slack output is enabled, define the Slack webhook URL")
            .implies("slack-enabled", "slack-webhook")
            .nargs("slack-webhook", 1)
            .describe("slack-force", "Whether program should send output to Slack even if containers are up")

            .fail((msg, err) => {
                console.error(msg)
                process.exit(1)
            })

            .argv;

        // console.log(JSON.stringify(argv));

        const configuration = new Configuration(
            argv.image as string[],
            argv.imagesDef as string
        );
        const containers = await this.configurationProcessor.processConfig(configuration);

        const messageConfigs = [];
        if (argv.consoleEnabled !== undefined && argv.consoleEnabled as boolean) {
            messageConfigs.push(new ConsoleMessageConfig(argv.consoleForce !== undefined && argv.consoleForce as boolean))
        }
        if (argv.slackEnabled !== undefined && argv.slackEnabled as boolean) {
            const slackConfig = new SlackMessageConfig(argv.slackWebhook as string, argv.slackForce !== undefined && argv.slackForce as boolean);
            messageConfigs.push(slackConfig);
        }
        await this.containerChecker.checkContainers(containers, messageConfigs);

        return true;
    }

}

export { Cli }