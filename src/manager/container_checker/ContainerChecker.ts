import {inject, injectable} from "inversify";
import {Logger} from "../../utils/log/Logger";
import TYPES from "../../di/types";
import {Messenger} from "../messenger/Messenger";
import lodash from "lodash";
import {MessageConfig} from "../../model/message_config/MessageConfig";
import container from "../../di/container";
import {LoggerMessenger} from "../messenger/impl/LoggerMessenger";
import {SlackMessenger} from "../messenger/impl/SlackMessenger";
import {ConsoleMessenger} from "../messenger/impl/ConsoleMessenger";
import { LoggerMessageConfig } from "../../model/message_config/impl/LoggerMessageConfig";
import { ConsoleMessageConfig } from "../../model/message_config/impl/ConsoleMessageConfig";
import { SlackMessageConfig } from "../../model/message_config/impl/SlackMessageConfig";
import { Container } from "../../model/container/Container";
import { ContainerState } from "../../model/container_state/ContainerState";

@injectable()
class ContainerChecker {

    constructor(
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    private getMessenger(messageConfig: MessageConfig): any {
        if (messageConfig instanceof LoggerMessageConfig) {
            return LoggerMessenger;
        } else if (messageConfig instanceof ConsoleMessageConfig) {
            return ConsoleMessenger;
        } else if (messageConfig instanceof SlackMessageConfig) {
            return SlackMessenger;
        } else {
            throw new Error("Unknown messenger");
        }
    }

    public async checkContainers(containers: Container[], messageConfigs: MessageConfig[]) {
        const allHealthy = lodash.every(containers, (container: Container) => {
            return container.state.id === ContainerState.RUNNING_HEALTHY.id;
        });
        for (const messageConfig of messageConfigs) {
            if (container.isBound(TYPES.Messenger)) container.unbind(TYPES.Messenger);
            container.bind<Messenger>(TYPES.Messenger).to(this.getMessenger(messageConfig));
            const messenger = container.get<Messenger>(TYPES.Messenger);
            if (!allHealthy || messageConfig.forceSend) {
                await messenger.sendMessage(containers, messageConfig);
            }
        }
    }

}

export { ContainerChecker }