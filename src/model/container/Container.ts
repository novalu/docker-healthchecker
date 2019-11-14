class Container {
    public static readonly STATUS_HEALTHY = 1;
    public static readonly STATUS_STARTING = 2;
    public static readonly STATUS_UNHEALTHY = 3;
    public static readonly STATUS_DOWN = 4;

    constructor(
        public id: string,
        public image: string,
        public health: number
    ) {}
}

export { Container }