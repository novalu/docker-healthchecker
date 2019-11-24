"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./di/types"));
const ContainerChecker_1 = require("./manager/container_checker/ContainerChecker");
const LoggerMessageConfig_1 = require("./model/message_config/impl/LoggerMessageConfig");
const ConfigurationProcessor_1 = require("./manager/configuration_processor/ConfigurationProcessor");
let App = class App {
    constructor(containerChecker, containerIdProvider, inspectProvider, configurationProcessor, logger) {
        this.containerChecker = containerChecker;
        this.containerIdProvider = containerIdProvider;
        this.inspectProvider = inspectProvider;
        this.configurationProcessor = configurationProcessor;
        this.logger = logger;
    }
    start(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const containers = yield this.configurationProcessor.processConfig(configuration);
            const messageConfigs = [new LoggerMessageConfig_1.LoggerMessageConfig(true)];
            this.containerChecker.checkContainers(containers, messageConfigs);
            //const containerId = await this.containerIdProvider.getContainerIdByImage("test:latest");
            //this.logger.info(containerId);
            //await this.inspectProvider.getInspectForId("17fba8182cbb");
            return true;
        });
    }
};
App = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ContainerChecker)),
    __param(1, inversify_1.inject(types_1.default.ContainerIdProvider)),
    __param(2, inversify_1.inject(types_1.default.InspectProvider)),
    __param(3, inversify_1.inject(types_1.default.ConfigurationProcessor)),
    __param(4, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [ContainerChecker_1.ContainerChecker, Object, Object, ConfigurationProcessor_1.ConfigurationProcessor, Object])
], App);
exports.App = App;
//# sourceMappingURL=App.js.map