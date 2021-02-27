import { Container } from "inversify";
import TYPES from "./types";
import { Logger } from "../utils/log/Logger";
import { SignaleLogger } from "../utils/log/impl/SignaleLogger";
import { Test } from "../test/Test";
import {InspectProvider} from "../provider/inspect/InspectProvider";
import {ContainerIdProvider} from "../provider/container_id/ContainerIdProvider";
import {App} from "../App";
import { Lib } from "../lib/Lib";
import { DockerContainerIdProvider } from "../provider/container_id/impl/DockerContainerIdProvider";
import { DockerInspectProvider } from "../provider/inspect/impl/DockerInspectProvider";
import { ContainersProcessor } from "../manager/containers_processor/ContainersProcessor";
import { ContainerStateMonitor } from "../manager/container_state_monitor/ContainerStateMonitor";
import { ContainerFinder } from "../manager/container_finder/ContainerFinder";
import {ConsoleConsumer} from "../model/consumer/impl/ConsoleConsumer";
import {LoggerConsumer} from "../model/consumer/impl/LoggerConsumer";
import {SlackConsumer} from "../model/consumer/impl/SlackConsumer";

const container = new Container();

container
    .bind<Test>(TYPES.Test)
    .to(Test)
    .inSingletonScope();
container
    .bind<App>(TYPES.App)
    .to(App)
    .inSingletonScope();
container
    .bind<Lib>(TYPES.Lib)
    .to(Lib)
    .inSingletonScope();

container
    .bind<ContainerIdProvider>(TYPES.ContainerIdProvider)
    .to(DockerContainerIdProvider)
    .inSingletonScope();
container
    .bind<InspectProvider>(TYPES.InspectProvider)
    .to(DockerInspectProvider)
    .inSingletonScope();

container
    .bind<ContainersProcessor>(TYPES.ContainersProcessor)
    .to(ContainersProcessor)
    .inSingletonScope();
container
    .bind<ContainerStateMonitor>(TYPES.ContainerStateMonitor)
    .to(ContainerStateMonitor)
    .inSingletonScope();
container
    .bind<ContainerFinder>(TYPES.ContainerFinder)
    .to(ContainerFinder)
    .inSingletonScope();

container
    .bind<ConsoleConsumer>(TYPES.ConsoleConsumer)
    .to(ConsoleConsumer)
    .inSingletonScope();
container
    .bind<LoggerConsumer>(TYPES.LoggerConsumer)
    .to(LoggerConsumer)
    .inSingletonScope();
container
    .bind<SlackConsumer>(TYPES.SlackConsumer)
    .to(SlackConsumer)
    .inSingletonScope();

export default container;