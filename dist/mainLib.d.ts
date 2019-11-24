import "reflect-metadata";
import { Container } from "./model/container/Container";
import { ContainerState } from "./model/container_state/ContainerState";
import { Configuration } from "./model/configuration/Configuration";
import { ContainerRequest } from "./model/configuration/ContainerRequest";
declare const containersHealth: (configuration: Configuration) => Promise<Container[]>;
export { containersHealth, Container, ContainerState, Configuration, ContainerRequest };
