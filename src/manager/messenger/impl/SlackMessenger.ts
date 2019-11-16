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

    private createFields(containers: Container[]): any[] {
        const fields = [];
        for (const container of containers) {
            fields.push({
                title: container.image,
                value: `container is ${container.state.text}`,
                short: false
            })
        }
        return fields;
    }

    private createAttachment(containers: Container[]): object {
        const attachment: any = {};
        attachment.fields = this.createFields(containers);
        const downestContainer = lodash.maxBy(containers, (container) => container.state.id);
        attachment.color = downestContainer.state.color;
        return attachment;
    }

    public async sendMessage(containers: Container[], messageConfig: MessageConfig) {
        if (!(messageConfig instanceof SlackMessageConfig)) {
            throw new Error("Message config is not Slack message config");
        }
        const slackMessageConfig = messageConfig as SlackMessageConfig;
        const webhook = new IncomingWebhook(slackMessageConfig.webhook);
        await webhook.send({
            text: "Container status",
            attachments: [ this.createAttachment(containers) ]
        });
        this.logger.info("Message sent");
    }

}

export { SlackMessenger }