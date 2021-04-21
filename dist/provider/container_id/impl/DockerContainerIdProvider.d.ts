import {ContainerIdProvider} from "../ContainerIdProvider";

declare class DockerContainerIdProvider implements ContainerIdProvider {
  getContainerIdByImage(image: string): Promise<string>;

  getContainerIdByName(name: string): Promise<string>;
}

export {DockerContainerIdProvider};
