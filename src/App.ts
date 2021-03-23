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

            .group(["image", "file"], "Images:")
            .alias("i", "image")
            .describe("image", "Docker image to check. Could be defined more times.")
            .array("image")
            .string("image")

            .alias("f", "file")
            .describe("file", "JSON file with image definition in format [{name: string, image: string, alias: string}, ...], where there should be at least name or image. Alias is optional.")
            .string("file")

            .group(["console", "console-force"], "Console output:")
            .describe("console", "Whether program should output to console")
            .describe("console-force", "Whether program should output even if containers are up")

            .group(["slack", "slack-webhook", "slack-force"], "Slack notification:")
            .describe("slack", "Whether program should send output to Slack")
            .describe("slack-webhook", "If slack output is enabled, define the Slack webhook URL")
            .implies("slack", "slack-webhook")
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
        if (argv.console !== undefined && lodash.isBoolean(argv.console) && argv.console) {
            const consoleForce = (argv.consoleForce !== undefined && lodash.isBoolean(argv.consoleForce)) ? argv.consoleForce as boolean : false;
            consumerOptions.push(new ConsoleConsumerOptions(consoleForce))
        }

        if (argv.slack !== undefined && lodash.isBoolean(argv.slack) && argv.slack) {
            const slackWebhook = argv.slackWebhook as string;
            const slackForce = (argv.slackForce !== undefined && lodash.isBoolean(argv.slackForce)) ? argv.slackForce as boolean : false;
            consumerOptions.push(new SlackConsumerOptions(slackWebhook, slackForce))
        }

        let configuration;
        if (argv.image !== undefined) {
            configuration = new PlainConfiguration(argv.image as string[], consumerOptions);
        } else if (argv.file !== undefined) {
            configuration = new FileConfiguration(argv.file as string, consumerOptions);
        } else {
            console.log("Image or file parameter should be provided.");
            return;
        }

        const containers = await this.containersProcessor.process(configuration);

        await this.containerStateMonitor.processState(containers, configuration);

        return true;
    }

}

export { App }