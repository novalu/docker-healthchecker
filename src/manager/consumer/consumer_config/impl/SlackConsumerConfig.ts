import {ConsumerConfig} from "../ConsumerConfig";

class SlackConsumerConfig extends ConsumerConfig {

    constructor(
        public webhook: string,
        forceSend: boolean
    ) {
        super(forceSend);
    }

}

export { SlackConsumerConfig }