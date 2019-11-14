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
const LoggerMessenger_1 = require("../messenger/impl/LoggerMessenger");
const SlackMessenger_1 = require("../messenger/impl/SlackMessenger");
const ConsoleMessenger_1 = require("../messenger/impl/ConsoleMessenger");
const LoggerMessageConfig_1 = require("../../model/message_config/impl/LoggerMessageConfig");
const ConsoleMessageConfig_1 = require("../../model/message_config/impl/ConsoleMessageConfig");
const SlackMessageConfig_1 = require("../../model/message_config/impl/SlackMessageConfig");
const Container_1 = require("../../model/container/Container");
let ContainerChecker = class ContainerChecker {
    constructor(logger) {
        this.logger = logger;
    }
    getMessenger(messageConfig) {
        if (messageConfig instanceof LoggerMessageConfig_1.LoggerMessageConfig) {
            return LoggerMessenger_1.LoggerMessenger;
        }
        else if (messageConfig instanceof ConsoleMessageConfig_1.ConsoleMessageConfig) {
            return ConsoleMessenger_1.ConsoleMessenger;
        }
        else if (messageConfig instanceof SlackMessageConfig_1.SlackMessageConfig) {
            return SlackMessenger_1.SlackMessenger;
        }
        else {
            throw new Error("Unknown messenger");
        }
    }
    checkContainers(containers, messageConfigs) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUp = lodash_1.default.every(containers, (container) => {
                return container.health === Container_1.Container.STATUS_HEALTHY;
            });
            for (const messageConfig of messageConfigs) {
                if (container_1.default.isBound(types_1.default.Messenger))
                    container_1.default.unbind(types_1.default.Messenger);
                container_1.default.bind(types_1.default.Messenger).to(this.getMessenger(messageConfig));
                const messenger = container_1.default.get(types_1.default.Messenger);
                if (!allUp || messageConfig.forceSend) {
                    yield messenger.sendMessage(containers, messageConfig);
                }
            }
        });
    }
};
ContainerChecker = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [Object])
], ContainerChecker);
exports.ContainerChecker = ContainerChecker;
//# sourceMappingURL=ContainerChecker.js.map