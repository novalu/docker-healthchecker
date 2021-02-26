import { ConsumerOptions } from "../ConsumerOptions";
declare class SlackConsumerOptions extends ConsumerOptions {
    webhook: string;
    type: number;
    constructor(webhook: string, force: boolean);
}
export { SlackConsumerOptions };
