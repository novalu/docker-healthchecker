import { Logger } from "../../utils/log/Logger";
import { MessageConfig } from "../../model/message_config/MessageConfig";
import { Container } from "../../model/container/Container";
declare class ContainerChecker {
    private logger;
    constructor(logger: Logger);
    private getMessenger;
    checkContainers(containers: Container[], messageConfigs: MessageConfig[]): Promise<void>;
}
export { ContainerChecker };
