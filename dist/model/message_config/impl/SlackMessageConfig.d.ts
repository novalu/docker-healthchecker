import { MessageConfig } from "../MessageConfig";
declare class SlackMessageConfig extends MessageConfig {
    webhook: string;
    constructor(webhook: string, forceSend: boolean);
}
export { SlackMessageConfig };
