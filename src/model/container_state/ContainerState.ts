class ContainerState {
    public static readonly RUNNING_UNKNOWN =
        new ContainerState(0, "unknown", "#AAAAAA"); // container is running and health state not found
    public static readonly RUNNING_HEALTHY =
        new ContainerState(1, "healthy", "#2EB886"); // container is running and health is: healthy
    public static readonly RUNNING_UNHEALTHY =
        new ContainerState(2, "unhealthy", "#FF4454");// container is running and health is: starting
    public static readonly RUNNING_STARTING =
        new ContainerState(3, "starting", "#000000"); // container is running and health is: unhealthy
    public static readonly DOWN =
        new ContainerState(4, "down", "#FF4454"); // container is not running

    constructor(
        public id: number,
        public text: string,
        public color: string
    ) {}
}

export { ContainerState }