import {ConsumerOptions} from "../ConsumerOptions";

class SlackConsumerOptions extends ConsumerOptions {
    type = ConsumerOptions.CONSUMER_TYPE_SLACK;

    constructor(
        public webhook: string,
        force: boolean
    ) {
        super(force);
    }

}

export { SlackConsumerOptions }