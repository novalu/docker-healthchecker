import {InspectProvider} from "../InspectProvider";

declare class EmptyInspectProvider implements InspectProvider {
  getInspectForId(id: string): Promise<string>;
}

export {EmptyInspectProvider};
