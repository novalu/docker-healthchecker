import { ConsumerConfig } from "../ConsumerConfig";
declare class SlackConsumerConfig extends ConsumerConfig {
    webhook: string;
    constructor(webhook: string, force: boolean);
}
export { SlackConsumerConfig };
