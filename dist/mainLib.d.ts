import "reflect-metadata";
import { Container } from "./model/container/Container";
import { ContainerState } from "./model/container_state/ContainerState";
declare const containersHealth: (...images: string[]) => Promise<Container[]>;
export { containersHealth, Container, ContainerState };
