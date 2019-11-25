import {injectable} from "inversify";
import { ContainerIdProvider } from "../ContainerIdProvider";

@injectable()
class FakeContainerIdProvider implements ContainerIdProvider {

    public async getContainerIdByImage(image: string): Promise<string> {
        return "";
    }

}

export { FakeContainerIdProvider }