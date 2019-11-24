import {Messenger} from "../Messenger";
import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import chalk = require("chalk");
import { MessageConfig } from "../../../model/message_config/MessageConfig";
import { Container } from "../../../model/container/Container";
import { ConsoleMessageConfig } from "../../../model/message_config/impl/ConsoleMessageConfig";
import { ContainerState } from "../../../model/container_state/ContainerState";

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
            switch (container.state.id) {
                case ContainerState.RUNNING_STARTING.id: healthText = container.state.text; break;
                case ContainerState.RUNNING_HEALTHY.id: healthText = this.color("green", container.state.text); break;
                case ContainerState.RUNNING_UNHEALTHY.id: healthText = this.color("red", container.state.text); break;
                case ContainerState.RUNNING_UNKNOWN.id: healthText = this.color("gray", container.state.text); break;
                case ContainerState.DOWN.id: healthText = this.color("red", container.state.text); break;
            }
            line.push(`${container.alias}: ${healthText}`);
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