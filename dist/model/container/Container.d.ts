declare class Container {
    id: string;
    image: string;
    health: number;
    static readonly STATUS_HEALTHY = 1;
    static readonly STATUS_STARTING = 2;
    static readonly STATUS_UNHEALTHY = 3;
    static readonly STATUS_DOWN = 4;
    constructor(id: string, image: string, health: number);
}
export { Container };
