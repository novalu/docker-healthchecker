import * as moment from "moment";
declare class Container {
    id: string;
    image: string;
    health: number;
    startedAt: moment.Moment;
    static readonly STATUS_RUNNING_HEALTHY = 1;
    static readonly STATUS_RUNNING_STARTING = 2;
    static readonly STATUS_RUNNING_UNHEALTHY = 3;
    static readonly STATUS_RUNNING_UNKNOWN = 4;
    static readonly STATUS_DOWN = 5;
    constructor(id: string, image: string, health: number, startedAt: moment.Moment);
}
export { Container };
