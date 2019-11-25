import {Consumer} from "../Consumer";
import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import chalk = require("chalk");
import { Container } from "../../../model/container/Container";
import { ContainerState } from "../../../model/container_state/ContainerState";
import { ConsumerConfig } from "../../containers_processor/configuration/consumer_config/ConsumerConfig";
import { ConsoleConsumerConfig } from "../../containers_processor/configuration/consumer_config/impl/ConsoleConsumerConfig";

@injectable()
class ConsoleConsumer implements Consumer {

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

    consume(containers: Container[], consumerConfig: ConsumerConfig) {
        if (!(consumerConfig instanceof ConsoleConsumerConfig)) {
            throw new Error("Message config is not Console message config");
        }
        const consoleConfig = consumerConfig as ConsoleConsumerConfig;
        const textSummary = this.getTextSummary(containers);
        console.log(textSummary);
    }

}

export { ConsoleConsumer }