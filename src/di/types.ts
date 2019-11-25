const TYPES = {
    App: Symbol("App"),
    Cli: Symbol("Cli"),
    Lib: Symbol("Lib"),

    ContainerIdProvider: Symbol("ContainerIdProvider"),
    InspectProvider: Symbol("InspectProvider"),

    ContainersProcessor: Symbol("ContainersProcessor"),
    ContainerStateMonitor: Symbol("ContainerStateMonitor"),
    ContainerFinder: Symbol("ContainerFinder"),
    Consumer: Symbol("Consumer"),

    Logger: Symbol("Logger")
}

export default TYPES;