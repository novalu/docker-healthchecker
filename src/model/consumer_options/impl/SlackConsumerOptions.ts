import {ConsumerOptions} from "../ConsumerOptions";

export class SlackConsumerOptions extends ConsumerOptions {
    type = ConsumerOptions.CONSUMER_TYPE_SLACK;

    constructor(
        public webhook: string,
        force: boolean
    ) {
        super(force);
    }

}