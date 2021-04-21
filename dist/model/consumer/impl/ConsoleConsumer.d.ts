import {Consumer} from "../Consumer";
import {Container} from "../../container/Container";
import {ConsumerOptions} from "../../consumer_options/ConsumerOptions";

declare class ConsoleConsumer implements Consumer {
  constructor();

  private color;
  private getTextSummary;

  consume(containers: Container[], consumerOptions: ConsumerOptions): void;
}

export {ConsoleConsumer};
