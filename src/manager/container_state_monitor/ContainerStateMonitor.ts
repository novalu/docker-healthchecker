import {inject, injectable} from "inversify";
import {Logger} from "../../utils/log/Logger";
import TYPES from "../../di/types";
import lodash from "lodash";
import {Container} from "../../model/container/Container";
import {ContainerState} from "../../model/container_state/ContainerState";
import {Consumer} from "../../model/consumer/Consumer";
import {LoggerConsumer} from "../../model/consumer/impl/LoggerConsumer";
import {ConsoleConsumer} from "../../model/consumer/impl/ConsoleConsumer";
import {SlackConsumer} from "../../model/consumer/impl/SlackConsumer";
import {Configuration} from "../../model/configuration/Configuration";
import {ConsumerOptions} from "../../model/consumer_options/ConsumerOptions";

@injectable()
class ContainerStateMonitor {

  constructor(
    @inject(TYPES.Logger) private logger: Logger,
    @inject(TYPES.SlackConsumer) private slackConsumer: SlackConsumer,
    @inject(TYPES.LoggerConsumer) private loggerConsumer: LoggerConsumer,
    @inject(TYPES.ConsoleConsumer) private consoleConsumer: ConsoleConsumer
  ) {
  }

  public async processState(containers: Container[], configuration: Configuration) {
    const everyHealthy = lodash.every(containers, (container: Container) => {
      return container.state.id === ContainerState.RUNNING_HEALTHY.id;
    });
    for (const consumerOptions of configuration.consumerOptions) {
      let consumer: Consumer;
      switch (consumerOptions.type) {
        case ConsumerOptions.CONSUMER_TYPE_SLACK:
          consumer = this.slackConsumer;
          break;
        case ConsumerOptions.CONSUMER_TYPE_LOGGER:
          consumer = this.loggerConsumer;
          break;
        case ConsumerOptions.CONSUMER_TYPE_CONSOLE:
          consumer = this.consoleConsumer;
          break;
      }
      if (!everyHealthy || consumerOptions.force) {
        await consumer.consume(containers, consumerOptions);
      }
    }
  }

}

export {ContainerStateMonitor}