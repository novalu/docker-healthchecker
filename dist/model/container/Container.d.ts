import * as moment from "moment";
import { ContainerState } from "../container_state/ContainerState";
declare class Container {
    id: string;
    image: string;
    alias: string;
    state: ContainerState;
    startedAt: moment.Moment;
    constructor(id: string, image: string, alias: string, state: ContainerState, startedAt: moment.Moment);
}
export { Container };
