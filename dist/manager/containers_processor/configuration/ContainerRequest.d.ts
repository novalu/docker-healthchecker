declare class ContainerRequest {
    alias: string;
    useName: boolean;
    image: string;
    name: string;
    constructor(alias: string, useName: boolean, image: string, name: string);
}
export { ContainerRequest };
