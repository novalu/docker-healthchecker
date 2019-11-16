import * as moment from "moment";

class Container {
    public static readonly STATUS_RUNNING_HEALTHY = 1; // container is running and health is: healthy
    public static readonly STATUS_RUNNING_STARTING = 2; // container is running and health is: starting
    public static readonly STATUS_RUNNING_UNHEALTHY = 3; // container is running and health is: unhealthy
    public static readonly STATUS_RUNNING_UNKNOWN = 4; // container is running and health state not found
    public static readonly STATUS_DOWN = 5; // container is not running

    constructor(
        public id: string,
        public image: string,
        public health: number,
        public startedAt: moment.Moment
    ) {}
}

export { Container }