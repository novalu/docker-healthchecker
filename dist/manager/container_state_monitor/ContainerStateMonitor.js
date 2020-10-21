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
const types_1 = __importDefault(require("../../di/types"));
const lodash_1 = __importDefault(require("lodash"));
const container_1 = __importDefault(require("../../di/container"));
const ContainerState_1 = require("../../model/container_state/ContainerState");
const SlackConsumer_1 = require("../consumer/impl/SlackConsumer");
const LoggerConsumer_1 = require("../consumer/impl/LoggerConsumer");
const ConsoleConsumer_1 = require("../consumer/impl/ConsoleConsumer");
const LoggerConsumerConfig_1 = require("../containers_processor/configuration/consumer_config/impl/LoggerConsumerConfig");
const ConsoleConsumerConfig_1 = require("../containers_processor/configuration/consumer_config/impl/ConsoleConsumerConfig");
const SlackConsumerConfig_1 = require("../containers_processor/configuration/consumer_config/impl/SlackConsumerConfig");
let ContainerStateMonitor = class ContainerStateMonitor {
    constructor(logger) {
        this.logger = logger;
    }
    getConsumer(consumerConfig) {
        if (consumerConfig instanceof LoggerConsumerConfig_1.LoggerConsumerConfig) {
            return LoggerConsumer_1.LoggerConsumer;
        }
        else if (consumerConfig instanceof ConsoleConsumerConfig_1.ConsoleConsumerConfig) {
            return ConsoleConsumer_1.ConsoleConsumer;
        }
        else if (consumerConfig instanceof SlackConsumerConfig_1.SlackConsumerConfig) {
            return SlackConsumer_1.SlackConsumer;
        }
        else {
            throw new Error("Unknown messenger");
        }
    }
    processState(containers, configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const healthy = lodash_1.default.every(containers, (container) => {
                return container.state.id === ContainerState_1.ContainerState.RUNNING_HEALTHY.id;
            });
            for (const consumerConfig of configuration.consumerConfigs) {
                if (container_1.default.isBound(types_1.default.Consumer))
                    container_1.default.unbind(types_1.default.Consumer);
                container_1.default.bind(types_1.default.Consumer).to(this.getConsumer(consumerConfig));
                const messenger = container_1.default.get(types_1.default.Consumer);
                if (!healthy || consumerConfig.force) {
                    yield messenger.consume(containers, consumerConfig);
                }
            }
        });
    }
};
ContainerStateMonitor = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [Object])
], ContainerStateMonitor);
exports.ContainerStateMonitor = ContainerStateMonitor;
//# sourceMappingURL=ContainerStateMonitor.js.map