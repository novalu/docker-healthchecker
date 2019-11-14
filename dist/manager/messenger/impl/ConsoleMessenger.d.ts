import { Messenger } from "../Messenger";
import { MessageConfig } from "../../../model/message_config/MessageConfig";
import { Container } from "../../../model/container/Container";
declare class ConsoleMessenger implements Messenger {
    constructor();
    private color;
    private getTextSummary;
    sendMessage(containers: Container[], messageConfig: MessageConfig): void;
}
export { ConsoleMessenger };
