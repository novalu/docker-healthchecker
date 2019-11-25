import { Container } from "../../model/container/Container";
import { ConsumerConfig } from "../containers_processor/configuration/consumer_config/ConsumerConfig";

interface Consumer {
    consume(containers: Container[], config: ConsumerConfig);
}

export { Consumer }