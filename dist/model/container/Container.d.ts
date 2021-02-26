import moment from "moment";
import { ContainerState } from "../container_state/ContainerState";
declare class Container {
    id: string;
    name: string;
    image: string;
    alias: string;
    state: ContainerState;
    startedAt: moment.Moment;
    constructor(id: string, name: string, image: string, alias: string, state: ContainerState, startedAt: moment.Moment);
}
export { Container };
