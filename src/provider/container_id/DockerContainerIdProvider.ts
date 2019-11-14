import {ContainerIdProvider} from "./ContainerIdProvider";
import {injectable} from "inversify";
import execSh = require("exec-sh");

@injectable()
class DockerContainerIdProvider implements ContainerIdProvider {

    public async getContainerIdByImage(image: string): Promise<string> {
        const execShPromise = execSh.promise;
        const result = await execShPromise(`docker ps | grep '${image}' | awk '{ print $1 }'`, true);
        const out = result.stdout.trim();
        return out;
    }

}

export { DockerContainerIdProvider }