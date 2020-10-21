"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./types"));
const App_1 = require("../App");
const Cli_1 = require("../Cli");
const Lib_1 = require("../Lib");
const DockerContainerIdProvider_1 = require("../provider/container_id/impl/DockerContainerIdProvider");
const DockerInspectProvider_1 = require("../provider/inspect/impl/DockerInspectProvider");
const ContainersProcessor_1 = require("../manager/containers_processor/ContainersProcessor");
const ContainerStateMonitor_1 = require("../manager/container_state_monitor/ContainerStateMonitor");
const ContainerFinder_1 = require("../manager/container_finder/ContainerFinder");
const container = new inversify_1.Container();
container
    .bind(types_1.default.App)
    .to(App_1.App)
    .inSingletonScope();
container
    .bind(types_1.default.Cli)
    .to(Cli_1.Cli)
    .inSingletonScope();
container
    .bind(types_1.default.Lib)
    .to(Lib_1.Lib)
    .inSingletonScope();
container
    .bind(types_1.default.ContainerIdProvider)
    .to(DockerContainerIdProvider_1.DockerContainerIdProvider)
    .inSingletonScope();
container
    .bind(types_1.default.InspectProvider)
    .to(DockerInspectProvider_1.DockerInspectProvider)
    .inSingletonScope();
container
    .bind(types_1.default.ContainersProcessor)
    .to(ContainersProcessor_1.ContainersProcessor)
    .inSingletonScope();
container
    .bind(types_1.default.ContainerStateMonitor)
    .to(ContainerStateMonitor_1.ContainerStateMonitor)
    .inSingletonScope();
container
    .bind(types_1.default.ContainerFinder)
    .to(ContainerFinder_1.ContainerFinder)
    .inSingletonScope();
exports.default = container;
//# sourceMappingURL=container.js.map