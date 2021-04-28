interface ContainerIdProvider {
    getContainerIdByImage(image: string): Promise<string>;
    getContainerIdByName(name: string): Promise<string>;
}
export { ContainerIdProvider };
