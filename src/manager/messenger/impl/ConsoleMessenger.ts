import {Messenger} from "../Messenger";
import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import chalk = require("chalk");
import { MessageConfig } from "../../../model/message_config/MessageConfig";
import { Container } from "../../../model/container/Container";
import { ConsoleMessageConfig } from "../../../model/message_config/impl/ConsoleMessageConfig";

@injectable()
class ConsoleMessenger implements Messenger {

    constructor(
    ) {}

    private color(color: string, text: string): string {
        if (color) {
            return chalk.hex(color)(text);
        } else {
            return text;
        }
    }

    private getTextSummary(containers: Container[]): string {
        const line = [];
        for (const container of containers) {
            let healthText;
            switch (container.health) {
                case Container.STATUS_RUNNING_STARTING: healthText = "starting"; break;
                case Container.STATUS_RUNNING_HEALTHY: healthText = this.color("green", "healthy"); break;
                case Container.STATUS_RUNNING_UNHEALTHY: healthText = this.color("red", "unhealthy"); break;
                case Container.STATUS_DOWN: healthText = this.color("gray", "down"); break;
            }
            line.push(`${container.image}: ${healthText}`);
        }
        return line.join("\n");
    };

    sendMessage(containers: Container[], messageConfig: MessageConfig) {
        if (!(messageConfig instanceof ConsoleMessageConfig)) {
            throw new Error("Message config is not Console message config");
        }
        const loggerMessageConfig = messageConfig as ConsoleMessageConfig;
        const textSummary = this.getTextSummary(containers);
        console.log(textSummary);
    }

}

export { ConsoleMessenger }