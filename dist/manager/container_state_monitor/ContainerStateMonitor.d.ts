import {Logger} from "../../utils/log/Logger";
import {Container} from "../../model/container/Container";
import {LoggerConsumer} from "../../model/consumer/impl/LoggerConsumer";
import {ConsoleConsumer} from "../../model/consumer/impl/ConsoleConsumer";
import {SlackConsumer} from "../../model/consumer/impl/SlackConsumer";
import {Configuration} from "../../model/configuration/Configuration";

declare class ContainerStateMonitor {
  private logger;
  private slackConsumer;
  private loggerConsumer;
  private consoleConsumer;

  constructor(logger: Logger, slackConsumer: SlackConsumer, loggerConsumer: LoggerConsumer, consoleConsumer: ConsoleConsumer);

  processState(containers: Container[], configuration: Configuration): Promise<void>;
}

export {ContainerStateMonitor};
