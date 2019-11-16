import {Messenger} from "../Messenger";
import {inject, injectable} from "inversify";
import TYPES from "../../../di/types";
import {Logger} from "../../../utils/log/Logger";
import {IncomingWebhook} from "@slack/webhook";
import { MessageConfig } from "../../../model/message_config/MessageConfig";
import { Container } from "../../../model/container/Container";
import { SlackMessageConfig } from "../../../model/message_config/impl/SlackMessageConfig";

@injectable()
class SlackMessenger implements Messenger {

    constructor(
        @inject(TYPES.Logger) private logger: Logger
    ) {
    }

    private createFields(containers: Container[]): any[] {
        const fields = [];
        for (const container of containers) {
            let healthText;
            switch (container.health) {
                case Container.STATUS_RUNNING_STARTING: healthText = "container is starting"; break;
                case Container.STATUS_RUNNING_HEALTHY: healthText = "container is healthy"; break;
                case Container.STATUS_RUNNING_UNHEALTHY: healthText = "container is unhealthy"; break;
                case Container.STATUS_RUNNING_UNKNOWN: healthText = "container health is unknown"; break;
                case Container.STATUS_DOWN: healthText = "container is down"; break;
            }
            fields.push({
                title: container.image,
                value: healthText,
                short: false
            })
        }
        return fields;
    }

    private createAttachment(containers: Container[]): object {
        const attachment: any = {};
        attachment.fields = this.createFields(containers);
        let health = Container.STATUS_RUNNING_HEALTHY;
        for (const container of containers) {
            health = container.health > health ? container.health : health;
        }
        let color;
        switch (health) {
            case Container.STATUS_RUNNING_STARTING: color = "#000000"; break;
            case Container.STATUS_RUNNING_HEALTHY: color = "#2EB886"; break;
            case Container.STATUS_RUNNING_UNHEALTHY: color = "#FF4454"; break;
            case Container.STATUS_RUNNING_UNKNOWN: color = "#AAAAAA"; break;
            case Container.STATUS_DOWN: color = "#FF4454"; break;
        }
        attachment.color = color;
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