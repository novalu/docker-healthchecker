import { ContainerRequest } from "./ContainerRequest";
import { ConsumerConfig } from "./consumer_config/ConsumerConfig";

class Configuration {
    constructor(
        public images: Array<string | ContainerRequest>,
        public imagesDef: string,
        public consumerConfigs: ConsumerConfig[]
    ) {}
}

export { Configuration }