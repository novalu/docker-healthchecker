import {ContainerIdProvider} from "./ContainerIdProvider";
import {injectable} from "inversify";

@injectable()
class FakeContainerIdProvider implements ContainerIdProvider {

    public async getContainerIdByImage(image: string): Promise<string> {
        return "";
    }

}

export { FakeContainerIdProvider }