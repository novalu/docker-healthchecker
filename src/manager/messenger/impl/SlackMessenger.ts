import {Messenger} from "../Messenger";
import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import {IncomingWebhook} from "@slack/webhook";
import { MessageConfig } from "../../../model/message_config/MessageConfig";
import { Container } from "../../../model/container/Container";
import { SlackMessageConfig } from "../../../model/message_config/impl/SlackMessageConfig";
import * as lodash from "lodash";

@injectable()
class SlackMessenger implements Messenger {

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

    public async sendMessage(containers: Container[], messageConfig: MessageConfig) {
        if (!(messageConfig instanceof SlackMessageConfig)) {
            throw new Error("Message config is not Slack message config");
        }
        const slackMessageConfig = messageConfig as SlackMessageConfig;
        const webhook = new IncomingWebhook(slackMessageConfig.webhook);
        await webhook.send({
            text: "Container status",
            attachments: this.createAttachments(containers)
        });
        this.logger.info("Message sent");
    }

}

export { SlackMessenger }