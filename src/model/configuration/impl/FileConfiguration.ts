import {Configuration} from "../Configuration";
import { ConsumerOptions } from "../../consumer_options/ConsumerOptions";

export class FileConfiguration extends Configuration {
    constructor(
        public filePath: string,
        consumerOptions: ConsumerOptions[]
    ) {
        super(Configuration.TYPE_FILE, consumerOptions);
    }
}