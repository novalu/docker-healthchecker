import { MessageConfig } from "../../model/message_config/MessageConfig";
import { Container } from "../../model/container/Container";
interface Messenger {
    sendMessage(containers: Container[], messageConfig: MessageConfig): any;
}
export { Messenger };
