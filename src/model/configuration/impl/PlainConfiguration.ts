import { Configuration } from "../Configuration";
import { ConsumerOptions } from "../../consumer_options/ConsumerOptions";

export class PlainConfiguration extends Configuration {
    constructor(
        public images: string[],
        consumerOptions: ConsumerOptions[]
    ) {
        super(Configuration.TYPE_PLAIN, consumerOptions);
    }
}