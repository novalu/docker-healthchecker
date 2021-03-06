declare class ContainerState {
    id: number;
    text: string;
    color: string;
    static readonly RUNNING_STARTING: ContainerState;
    static readonly RUNNING_HEALTHY: ContainerState;
    static readonly RUNNING_UNHEALTHY: ContainerState;
    static readonly DOWN: ContainerState;
    static readonly RUNNING_UNKNOWN: ContainerState;
    static readonly NOT_FOUND: ContainerState;
    constructor(id: number, text: string, color: string);
}
export { ContainerState };
