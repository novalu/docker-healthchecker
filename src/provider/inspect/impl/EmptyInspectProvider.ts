import {injectable} from "inversify";
import {InspectProvider} from "../InspectProvider";

@injectable()
class EmptyInspectProvider implements InspectProvider {

  async getInspectForId(id: string): Promise<string> {
    return "";
  }

}

export {EmptyInspectProvider}