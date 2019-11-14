"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./types"));
const App_1 = require("../App");
const ContainerChecker_1 = require("../manager/container_checker/ContainerChecker");
const ContainerGetter_1 = require("../manager/container_get/ContainerGetter");
const DockerContainerIdProvider_1 = require("../provider/container_id/DockerContainerIdProvider");
const DockerInspectProvider_1 = require("../provider/inspect/DockerInspectProvider");
const Cli_1 = require("../Cli");
const Lib_1 = require("../Lib");
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
    .bind(types_1.default.ContainerChecker)
    .to(ContainerChecker_1.ContainerChecker)
    .inSingletonScope();
container
    .bind(types_1.default.ContainerGetter)
    .to(ContainerGetter_1.ContainerGetter)
    .inSingletonScope();
exports.default = container;
//# sourceMappingURL=container.js.map