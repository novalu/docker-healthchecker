import { Container } from "../../model/container/Container";
import { ConsumerConfig } from "./consumer_config/ConsumerConfig";

interface Consumer {
    consume(containers: Container[], consumerConfig: ConsumerConfig);
}

export { Consumer }