import {InspectProvider} from "./InspectProvider";
import execSh = require("exec-sh");
import {inject, injectable} from "inversify";
import {Logger} from "../../utils/log/Logger";
import TYPES from "../../di/types";

@injectable()
class DockerInspectProvider implements InspectProvider {

    constructor(
        @inject(TYPES.Logger) private logger: Logger
    ) {}

    async getInspectForId(id: string): Promise<string> {
        const execShPromise = execSh.promise;
        let result;
        try {
            result = await execShPromise(`docker inspect ${id}`, true);
            if (result.stderr) {
                this.logger.warn("Cannot get inspect (stderr)");
            } else {
                return result.stdout;
            }
        } catch (err) {
            this.logger.warn("Cannot get inspect (err)");
        }
        return undefined;
    }

}

export { DockerInspectProvider }