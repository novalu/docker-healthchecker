import {Logger} from "../../../utils/log/Logger";
import {Container} from "../../container/Container";
import {ConsumerOptions} from "../../consumer_options/ConsumerOptions";
import {Consumer} from "../Consumer";

declare class LoggerConsumer implements Consumer {
  private logger;

  constructor(logger: Logger);

  private color;
  private getTextSummary;

  consume(containers: Container[], consumerOptions: ConsumerOptions): void;
}

export {LoggerConsumer};
