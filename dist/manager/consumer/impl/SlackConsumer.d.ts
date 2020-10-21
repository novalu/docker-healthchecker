import { Consumer } from "../Consumer";
import { Logger } from "../../../utils/log/Logger";
import { Container } from "../../../model/container/Container";
import { ConsumerConfig } from "../../containers_processor/configuration/consumer_config/ConsumerConfig";
declare class SlackConsumer implements Consumer {
    private logger;
    constructor(logger: Logger);
    private createFields;
    private createAttachments;
    consume(containers: Container[], consumerConfig: ConsumerConfig): Promise<void>;
}
export { SlackConsumer };
