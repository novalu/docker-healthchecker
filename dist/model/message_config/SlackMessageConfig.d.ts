import { MessageConfig } from "./MessageConfig";
declare class SlackMessageConfig extends MessageConfig {
    webhook: string;
    color: string;
    constructor(webhook: string, color: string);
}
export { SlackMessageConfig };
