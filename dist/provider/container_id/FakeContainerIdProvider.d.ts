import { ContainerIdProvider } from "./ContainerIdProvider";
declare class FakeContainerIdProvider implements ContainerIdProvider {
    getContainerIdByImage(image: string): Promise<string>;
}
export { FakeContainerIdProvider };
