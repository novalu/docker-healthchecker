import {InspectProvider} from "./InspectProvider";
import {injectable} from "inversify";

@injectable()
class EmptyInspectProvider implements InspectProvider {

    async getInspectForId(id: string): Promise<string> {
        return "";
    }

}

export { EmptyInspectProvider }