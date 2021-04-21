import {Logger} from "../../../utils/log/Logger";
import {Container} from "../../container/Container";
import {Consumer} from "../Consumer";
import {ConsumerOptions} from "../../consumer_options/ConsumerOptions";

declare class SlackConsumer implements Consumer {
  private logger;

  constructor(logger: Logger);

  private createFields;
  private createAttachments;

  consume(containers: Container[], consumerOptions: ConsumerOptions): Promise<void>;
}

export {SlackConsumer};
