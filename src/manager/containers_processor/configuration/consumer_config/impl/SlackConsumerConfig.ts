import {ConsumerConfig} from "../ConsumerConfig";

class SlackConsumerConfig extends ConsumerConfig {

    constructor(
        public webhook: string,
        force: boolean
    ) {
        super(force);
    }

}

export { SlackConsumerConfig }