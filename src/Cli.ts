import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import { ContainerStateMonitor } from "./manager/container_state_monitor/ContainerStateMonitor";
import { ContainersProcessor } from "./manager/containers_processor/ContainersProcessor";
import { Configuration } from "./manager/containers_processor/configuration/Configuration";
import { ConsoleConsumerConfig } from "./manager/consumer/consumer_config/impl/ConsoleConsumerConfig";
import { SlackConsumerConfig } from "./manager/consumer/consumer_config/impl/SlackConsumerConfig";

@injectable()
class Cli {
    constructor(
        @inject(TYPES.ContainerStateMonitor) private containerStateMonitor: ContainerStateMonitor,
        @inject(TYPES.ContainersProcessor) private containersProcessor: ContainersProcessor,
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
        const containers = await this.containersProcessor.process(configuration);

        const messageConfigs = [];
        if (argv.consoleEnabled !== undefined && argv.consoleEnabled as boolean) {
            messageConfigs.push(new ConsoleConsumerConfig(argv.consoleForce !== undefined && argv.consoleForce as boolean))
        }
        if (argv.slackEnabled !== undefined && argv.slackEnabled as boolean) {
            const slackConfig = new SlackConsumerConfig(argv.slackWebhook as string, argv.slackForce !== undefined && argv.slackForce as boolean);
            messageConfigs.push(slackConfig);
        }
        await this.containerStateMonitor.processState(containers, messageConfigs);

        return true;
    }

}

export { Cli }