import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import {Container} from "../../container/Container";
import {ContainerState} from "../../container_state/ContainerState";
import {ConsumerOptions} from "../../consumer_options/ConsumerOptions";
import {LoggerConsumerOptions} from "../../consumer_options/impl/LoggerConsumerOptions";
import {Consumer} from "../Consumer";
import chalk = require("chalk");

@injectable()
class LoggerConsumer implements Consumer {

  constructor(
    @inject(TYPES.Logger) private logger: Logger
  ) {
  }

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
        case ContainerState.RUNNING_STARTING.id:
          healthText = container.state.text;
          break;
        case ContainerState.RUNNING_HEALTHY.id:
          healthText = this.color("green", container.state.text);
          break;
        case ContainerState.RUNNING_UNHEALTHY.id:
          healthText = this.color("red", container.state.text);
          break;
        case ContainerState.RUNNING_UNKNOWN.id:
          healthText = this.color("gray", container.state.text);
          break;
        case ContainerState.DOWN.id:
          healthText = this.color("red", container.state.text);
          break;
        case ContainerState.NOT_FOUND.id:
          healthText = this.color("red", container.state.text);
          break;
      }
      line.push(`${container.alias}: ${healthText}`);
    }
    return line.join("\n");
  };

  consume(containers: Container[], consumerOptions: ConsumerOptions) {
    if (!(consumerOptions instanceof LoggerConsumerOptions)) {
      throw new Error("Consumer config is not Slack consumer config");
    }
    const loggerConfig = consumerOptions as LoggerConsumerOptions;
    const textSummary = this.getTextSummary(containers);
    this.logger.info(textSummary);
  }

}

export {LoggerConsumer}