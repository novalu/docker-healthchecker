import { Messenger } from "../Messenger";
import { Logger } from "../../../utils/log/Logger";
import { MessageConfig } from "../../../model/message_config/MessageConfig";
import { Container } from "../../../model/container/Container";
declare class LoggerMessenger implements Messenger {
    private logger;
    constructor(logger: Logger);
    private color;
    private getTextSummary;
    sendMessage(containers: Container[], messageConfig: MessageConfig): void;
}
export { LoggerMessenger };
