import { InspectProvider } from "../InspectProvider";
import { Logger } from "../../../utils/log/Logger";
declare class DockerInspectProvider implements InspectProvider {
    private logger;
    constructor(logger: Logger);
    getInspectForId(id: string): Promise<string>;
}
export { DockerInspectProvider };
