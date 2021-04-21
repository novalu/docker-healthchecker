class ContainerState {
  public static readonly RUNNING_STARTING =
    new ContainerState(1, "starting", "#000000"); // container is running and health is: unhealthy
  public static readonly RUNNING_HEALTHY =
    new ContainerState(2, "healthy", "#2EB886"); // container is running and health is: healthy
  public static readonly RUNNING_UNHEALTHY =
    new ContainerState(3, "unhealthy", "#FF4454"); // container is running and health is: starting
  public static readonly DOWN =
    new ContainerState(4, "down", "#FF4454"); // container is not running
  public static readonly RUNNING_UNKNOWN =
    new ContainerState(5, "unknown", "#AAAAAA"); // container is running and health state not found
  public static readonly NOT_FOUND =
    new ContainerState(6, "not found", "#AAAAAA"); // container is not found

  constructor(
    public id: number,
    public text: string,
    public color: string
  ) {
  }
}

export {ContainerState}