import { Consumer } from "../Consumer";
import { Logger } from "../../../utils/log/Logger";
import { Container } from "../../../model/container/Container";
import { ConsumerConfig } from "../../containers_processor/configuration/consumer_config/ConsumerConfig";
declare class LoggerConsumer implements Consumer {
    private logger;
    constructor(logger: Logger);
    private color;
    private getTextSummary;
    consume(containers: Container[], consumerConfig: ConsumerConfig): void;
}
export { LoggerConsumer };
