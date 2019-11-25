import {Consumer} from "../Consumer";
import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import {IncomingWebhook} from "@slack/webhook";
import { Container } from "../../../model/container/Container";
import * as lodash from "lodash";
import { ConsumerConfig } from "../consumer_config/ConsumerConfig";
import { SlackConsumerConfig } from "../consumer_config/impl/SlackConsumerConfig";

@injectable()
class SlackConsumer implements Consumer {

    constructor(
        @inject(TYPES.Logger) private logger: Logger
    ) {
    }

    private createFields(container: Container): any[] {
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

    public async consume(containers: Container[], consumerConfig: ConsumerConfig) {
        if (!(consumerConfig instanceof SlackConsumerConfig)) {
            throw new Error("Message config is not Slack message config");
        }
        const slackConfig = consumerConfig as SlackConsumerConfig;
        const webhook = new IncomingWebhook(slackConfig.webhook);
        await webhook.send({
            text: "Container status",
            attachments: this.createAttachments(containers)
        });
        this.logger.info("Message sent");
    }

}

export { SlackConsumer }