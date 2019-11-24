import { ContainerRequest } from "./ContainerRequest";

class Configuration {
    constructor(
        public images: Array<string | ContainerRequest>,
        public imagesFile: string,
    ) {}
}

export { Configuration }