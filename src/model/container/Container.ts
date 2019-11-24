import * as moment from "moment";
import { ContainerState } from "../container_state/ContainerState";

class Container {
    constructor(
        public id: string,
        public image: string,
        public alias: string,
        public state: ContainerState,
        public startedAt: moment.Moment
    ) {}
}

export { Container }