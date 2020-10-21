import { ContainerRequest } from "./ContainerRequest";
import { ConsumerConfig } from "./consumer_config/ConsumerConfig";
declare class Configuration {
    images: Array<string | ContainerRequest>;
    imagesDef: string;
    consumerConfigs: ConsumerConfig[];
    constructor(images: Array<string | ContainerRequest>, imagesDef: string, consumerConfigs: ConsumerConfig[]);
}
export { Configuration };
