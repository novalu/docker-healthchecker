import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import { ContainerStateMonitor } from "./manager/container_state_monitor/ContainerStateMonitor";
import { ContainersProcessor } from "./manager/containers_processor/ContainersProcessor";
import lodash from "lodash";
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
            .describe("images-file", "JSON file with image definition in format [{name: string, image: string, alias: string}, ...]")
            .string("images-file")

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

        // TODO validate with joi

        const consumerOptions = [];
        if (argv.consoleEnabled !== undefined && lodash.isBoolean(argv.consoleEnabled) && argv.consoleEnabled) {
            const consoleForce = (argv.consoleForce !== undefined && lodash.isBoolean(argv.consoleForce)) ? argv.consoleForce as boolean : false;
            consumerOptions.push(new ConsoleConsumerOptions(consoleForce))
        }

        if (argv.slackEnabled !== undefined && lodash.isBoolean(argv.slackEnabled) && argv.slackEnabled) {
            const slackWebhook = argv.slackWebhook as string;
            const slackForce = (argv.slackForce !== undefined && lodash.isBoolean(argv.slackForce)) ? argv.slackForce as boolean : false;
            consumerOptions.push(new SlackConsumerOptions(slackWebhook, slackForce))
        }

        let configuration = undefined;
        if (argv.image !== undefined) {
            configuration = new PlainConfiguration(argv.image as string[], consumerOptions);
        } else if (argv.imagesFile !== undefined) {
            configuration = new FileConfiguration(argv.imagesFile as string, consumerOptions);
        } else {
            console.log("Image or imagesFile parameter should be provided.");
            return;
        }

        const containers = await this.containersProcessor.process(configuration);

        await this.containerStateMonitor.processState(containers, configuration);

        return true;
    }

}

export { App }