declare class ContainerHealth {
    id: number;
    text: string;
    color: string;
    static readonly STATUS_RUNNING_UNKNOWN: ContainerHealth;
    static readonly STATUS_RUNNING_HEALTHY: ContainerHealth;
    static readonly STATUS_RUNNING_UNHEALTHY: ContainerHealth;
    static readonly STATUS_RUNNING_STARTING: ContainerHealth;
    static readonly STATUS_DOWN: ContainerHealth;
    constructor(id: number, text: string, color: string);
}
export { ContainerHealth };
