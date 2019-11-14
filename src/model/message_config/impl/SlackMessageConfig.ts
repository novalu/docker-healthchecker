import {MessageConfig} from "../MessageConfig";

class SlackMessageConfig extends MessageConfig {

    constructor(
        public webhook: string,
        forceSend: boolean
    ) {
        super(forceSend);
    }

}

export { SlackMessageConfig }