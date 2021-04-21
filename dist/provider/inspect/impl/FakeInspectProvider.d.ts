import {InspectProvider} from "../InspectProvider";

declare class FakeInspectProvider implements InspectProvider {
  constructor();

  getInspectForId(id: string): Promise<string>;
}

export {FakeInspectProvider};
