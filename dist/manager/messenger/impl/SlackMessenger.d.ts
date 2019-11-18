import { Messenger } from "../Messenger";
import { Logger } from "../../../utils/log/Logger";
import { MessageConfig } from "../../../model/message_config/MessageConfig";
import { Container } from "../../../model/container/Container";
declare class SlackMessenger implements Messenger {
    private logger;
    constructor(logger: Logger);
    private createFields;
    private createAttachments;
    sendMessage(containers: Container[], messageConfig: MessageConfig): Promise<void>;
}
export { SlackMessenger };
