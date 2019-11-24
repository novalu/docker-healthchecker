import "reflect-metadata";
import { Container } from "./model/container/Container";
import { ContainerState } from "./model/container_state/ContainerState";
import { Configuration } from "./model/configuration/Configuration";
declare const containersHealth: (configuration: Configuration) => Promise<Container[]>;
export { containersHealth, Container, ContainerState, Configuration };
