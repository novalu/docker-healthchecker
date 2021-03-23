import {injectable} from "inversify";
import execSh = require("exec-sh");
import { ContainerIdProvider } from "../ContainerIdProvider";

@injectable()
class DockerContainerIdProvider implements ContainerIdProvider {

    public async getContainerIdByImage(image: string): Promise<string> {
        const execShPromise = execSh.promise;
        const result = await execShPromise(`docker ps -a | awk '$2=="${image}"' | awk '{ print $1 }'`, true);
        const out = result.stdout.trim();
        return out === "" ? undefined : out;
    }

    public async getContainerIdByName(name: string): Promise<string> {
        const execShPromise = execSh.promise;
        const result = await execShPromise(`docker ps -a --format "table {{.ID}} {{.Names}}" | awk '$2=="${name}"' | awk '{ print $1 }`, true);
        const out = result.stdout.trim();
        return out === "" ? undefined : out;
    }

}

export { DockerContainerIdProvider }