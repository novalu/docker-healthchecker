interface ContainerIdProvider {
    getContainerIdByImage(image: string): Promise<string>;
}
export { ContainerIdProvider };
