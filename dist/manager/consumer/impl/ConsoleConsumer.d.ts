import { Consumer } from "../Consumer";
import { Container } from "../../../model/container/Container";
import { ConsumerConfig } from "../../containers_processor/configuration/consumer_config/ConsumerConfig";
declare class ConsoleConsumer implements Consumer {
    constructor();
    private color;
    private getTextSummary;
    consume(containers: Container[], consumerConfig: ConsumerConfig): void;
}
export { ConsoleConsumer };
