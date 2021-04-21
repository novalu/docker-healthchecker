import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import {IncomingWebhook} from "@slack/client";
import {Container} from "../../container/Container";
import {Consumer} from "../Consumer";
import {ConsumerOptions} from "../../consumer_options/ConsumerOptions";
import {SlackConsumerOptions} from "../../consumer_options/impl/SlackConsumerOptions";

@injectable()
class SlackConsumer implements Consumer {

  constructor(
    @inject(TYPES.Logger) private logger: Logger
  ) {
  }

  private createFields(container: Container): any[] {
    const fields = [];
    fields.push({
      title: "Image",
      value: container.alias,
      short: true
    });
    fields.push({
      title: "State",
      value: `container is ${container.state.text}`,
      short: true
    })
    return fields;
  }

  private createAttachments(containers: Container[]): object[] {
    const attachments: any[] = [];
    for (const container of containers) {
      attachments.push({
        fields: this.createFields(container),
        color: container.state.color
      })
    }
    return attachments;
  }

  public async consume(containers: Container[], consumerOptions: ConsumerOptions) {
    if (!(consumerOptions instanceof SlackConsumerOptions)) {
      throw new Error("Message config is not Slack message config");
    }
    const slackConfig = consumerOptions as SlackConsumerOptions;
    const webhook = new IncomingWebhook(slackConfig.webhook);
    await webhook.send({
      text: "Container status",
      attachments: this.createAttachments(containers)
    });
    this.logger.info("Message sent");
  }

}

export {SlackConsumer}