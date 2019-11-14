import { Container } from "inversify";
import TYPES from "./types";
import { Logger } from "../utils/log/Logger";
import { SignaleLogger } from "../utils/log/impl/SignaleLogger";
import { App } from "../App";
import {InspectProvider} from "../provider/inspect/InspectProvider";
import {FakeInspectProvider} from "../provider/inspect/FakeInspectProvider";
import {ContainerIdProvider} from "../provider/container_id/ContainerIdProvider";
import {FakeContainerIdProvider} from "../provider/container_id/FakeContainerIdProvider";
import {Messenger} from "../manager/messenger/Messenger";
import {LoggerMessenger} from "../manager/messenger/impl/LoggerMessenger";
import {ContainerChecker} from "../manager/container_checker/ContainerChecker";
import {ContainerGetter} from "../manager/container_get/ContainerGetter";
import {EmptyInspectProvider} from "../provider/inspect/EmptyInspectProvider";
import {DockerContainerIdProvider} from "../provider/container_id/DockerContainerIdProvider";
import {DockerInspectProvider} from "../provider/inspect/DockerInspectProvider";
import {Cli} from "../Cli";
import { Lib } from "../Lib";

const container = new Container();

container
    .bind<App>(TYPES.App)
    .to(App)
    .inSingletonScope();
container
    .bind<Cli>(TYPES.Cli)
    .to(Cli)
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
    .bind<ContainerChecker>(TYPES.ContainerChecker)
    .to(ContainerChecker)
    .inSingletonScope();
container
    .bind<ContainerGetter>(TYPES.ContainerGetter)
    .to(ContainerGetter)
    .inSingletonScope();

export default container;