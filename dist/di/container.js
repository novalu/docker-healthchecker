"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./types"));
const Test_1 = require("../test/Test");
const App_1 = require("../App");
const Lib_1 = require("../lib/Lib");
const DockerContainerIdProvider_1 = require("../provider/container_id/impl/DockerContainerIdProvider");
const DockerInspectProvider_1 = require("../provider/inspect/impl/DockerInspectProvider");
const ContainersProcessor_1 = require("../manager/containers_processor/ContainersProcessor");
const ContainerStateMonitor_1 = require("../manager/container_state_monitor/ContainerStateMonitor");
const ContainerFinder_1 = require("../manager/container_finder/ContainerFinder");
const ConsoleConsumer_1 = require("../model/consumer/impl/ConsoleConsumer");
const LoggerConsumer_1 = require("../model/consumer/impl/LoggerConsumer");
const SlackConsumer_1 = require("../model/consumer/impl/SlackConsumer");
const container = new inversify_1.Container();
container
  .bind(types_1.default.Test)
  .to(Test_1.Test)
  .inSingletonScope();
container
  .bind(types_1.default.App)
  .to(App_1.App)
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
container
  .bind(types_1.default.ConsoleConsumer)
  .to(ConsoleConsumer_1.ConsoleConsumer)
  .inSingletonScope();
container
  .bind(types_1.default.LoggerConsumer)
  .to(LoggerConsumer_1.LoggerConsumer)
  .inSingletonScope();
container
  .bind(types_1.default.SlackConsumer)
  .to(SlackConsumer_1.SlackConsumer)
  .inSingletonScope();
exports.default = container;
//# sourceMappingURL=container.js.map