import {inject, injectable} from "inversify";
import {Logger} from "../../utils/log/Logger";
import TYPES from "../../di/types";
import lodash from "lodash";
import container from "../../di/container";
import { Container } from "../../model/container/Container";
import { ContainerState } from "../../model/container_state/ContainerState";
import { SlackConsumer } from "../consumer/impl/SlackConsumer";
import { LoggerConsumer } from "../consumer/impl/LoggerConsumer";
import { ConsoleConsumer } from "../consumer/impl/ConsoleConsumer";
import { Consumer } from "../consumer/Consumer";
import {Configuration} from "../containers_processor/configuration/Configuration";
import { ConsumerConfig } from "../containers_processor/configuration/consumer_config/ConsumerConfig";
import { LoggerConsumerConfig } from "../containers_processor/configuration/consumer_config/impl/LoggerConsumerConfig";
import { ConsoleConsumerConfig } from "../containers_processor/configuration/consumer_config/impl/ConsoleConsumerConfig";
import { SlackConsumerConfig } from "../containers_processor/configuration/consumer_config/impl/SlackConsumerConfig";

@injectable()
class ContainerStateMonitor {

    constructor(
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    private getConsumer(consumerConfig: ConsumerConfig): any {
        if (consumerConfig instanceof LoggerConsumerConfig) {
            return LoggerConsumer;
        } else if (consumerConfig instanceof ConsoleConsumerConfig) {
            return ConsoleConsumer;
        } else if (consumerConfig instanceof SlackConsumerConfig) {
            return SlackConsumer;
        } else {
            throw new Error("Unknown messenger");
        }
    }

    public async processState(containers: Container[], configuration: Configuration) {
        const healthy = lodash.every(containers, (container: Container) => {
            return container.state.id === ContainerState.RUNNING_HEALTHY.id;
        });
        for (const consumerConfig of configuration.consumerConfigs) {
            if (container.isBound(TYPES.Consumer)) container.unbind(TYPES.Consumer);
            container.bind<Consumer>(TYPES.Consumer).to(this.getConsumer(consumerConfig));
            const messenger = container.get<Consumer>(TYPES.Consumer);
            if (!healthy || consumerConfig.force) {
                await messenger.consume(containers, consumerConfig);
            }
        }
    }

}

export { ContainerStateMonitor }