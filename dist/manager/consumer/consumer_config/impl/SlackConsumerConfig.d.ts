import { ConsumerConfig } from "../ConsumerConfig";
declare class SlackConsumerConfig extends ConsumerConfig {
    webhook: string;
    constructor(webhook: string, forceSend: boolean);
}
export { SlackConsumerConfig };
