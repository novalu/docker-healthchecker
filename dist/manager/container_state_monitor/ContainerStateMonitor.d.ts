import { Logger } from "../../utils/log/Logger";
import { Container } from "../../model/container/Container";
import { Configuration } from "../containers_processor/configuration/Configuration";
declare class ContainerStateMonitor {
    private logger;
    constructor(logger: Logger);
    private getConsumer;
    processState(containers: Container[], configuration: Configuration): Promise<void>;
}
export { ContainerStateMonitor };
