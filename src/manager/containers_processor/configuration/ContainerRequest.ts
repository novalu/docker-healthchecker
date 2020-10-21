class ContainerRequest {
    constructor(
        public alias: string,
        public useName: boolean = false,
        public image: string,
        public name: string
    ) {}
}

export { ContainerRequest }