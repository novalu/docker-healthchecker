import { ContainerRequest } from "./ContainerRequest";
declare class Configuration {
    images: Array<string | ContainerRequest>;
    imagesFile: string;
    constructor(images: Array<string | ContainerRequest>, imagesFile: string);
}
export { Configuration };
