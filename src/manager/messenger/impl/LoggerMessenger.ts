import {Messenger} from "../Messenger";
import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import chalk = require("chalk");
import { MessageConfig } from "../../../model/message_config/MessageConfig";
import { Container } from "../../../model/container/Container";
import { LoggerMessageConfig } from "../../../model/message_config/impl/LoggerMessageConfig";
import { ContainerState } from "../../../model/container_state/ContainerState";

@injectable()
class LoggerMessenger implements Messenger {

    constructor(
        @inject(TYPES.Logger) private logger: Logger
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
            line.push(`${container.image}: ${healthText}`);
        }
        return line.join("\n");
    };

    sendMessage(containers: Container[], messageConfig: MessageConfig) {
        if (!(messageConfig instanceof LoggerMessageConfig)) {
            throw new Error("Message config is not Slack message config");
        }
        const loggerMessageConfig = messageConfig as LoggerMessageConfig;
        const textSummary = this.getTextSummary(containers);
        this.logger.info(textSummary);
    }

}

export { LoggerMessenger }