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
const Container_1 = require("../../model/container/Container");
const TimeUtils_1 = require("../../utils/TimeUtils");
const ContainerState_1 = require("../../model/container_state/ContainerState");
const ContainerRequest_1 = require("../containers_processor/configuration/ContainerRequest");
let ContainerFinder = class ContainerFinder {
    constructor(containerIdProvider, inspectProvider, logger) {
        this.containerIdProvider = containerIdProvider;
        this.inspectProvider = inspectProvider;
        this.logger = logger;
    }
    getHealth(parsedContainer) {
        if (parsedContainer.State.Health) {
            const healthStatus = parsedContainer.State.Health.Status;
            switch (healthStatus) {
                case "healthy":
                    return ContainerState_1.ContainerState.RUNNING_HEALTHY;
                    break;
                case "unhealthy":
                    return ContainerState_1.ContainerState.RUNNING_UNHEALTHY;
                    break;
                case "starting":
                    return ContainerState_1.ContainerState.RUNNING_STARTING;
                    break;
            }
        }
        else {
            return ContainerState_1.ContainerState.RUNNING_UNKNOWN;
        }
    }
    getContainerFromInspect(inspect, name, image, alias) {
        const parsedInspect = JSON.parse(inspect);
        const parsedContainer = parsedInspect[0];
        const id = parsedContainer.Id.substr(12);
        const health = this.getHealth(parsedContainer);
        const startedAt = TimeUtils_1.TimeUtils.moment(parsedContainer.State.StartedAt);
        const container = new Container_1.Container(id, name, image, alias, health, startedAt);
        return container;
    }
    findContainer(container) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = "";
            let image = "";
            let containerId;
            if (container instanceof ContainerRequest_1.ContainerRequest) {
                if (container.useName) {
                    name = container.name;
                    containerId = yield this.containerIdProvider.getContainerIdByName(container.name);
                }
                else {
                    image = container.image;
                    containerId = yield this.containerIdProvider.getContainerIdByImage(container.image);
                }
            }
            else {
                image = container;
                containerId = yield this.containerIdProvider.getContainerIdByImage(container);
            }
            const alias = container instanceof ContainerRequest_1.ContainerRequest ? container.alias : container;
            if (containerId !== undefined) {
                const inspectOutput = yield this.inspectProvider.getInspectForId(containerId);
                if (inspectOutput !== undefined) {
                    return this.getContainerFromInspect(inspectOutput, name, image, alias);
                }
                else {
                    this.logger.warn(`Cannot inspect container from image ${image}.`);
                }
            }
            else {
                this.logger.warn(`Container for image ${image} not found.`);
            }
            return new Container_1.Container("n/a", name, image, alias, ContainerState_1.ContainerState.DOWN, undefined);
        });
    }
};
ContainerFinder = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ContainerIdProvider)),
    __param(1, inversify_1.inject(types_1.default.InspectProvider)),
    __param(2, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ContainerFinder);
exports.ContainerFinder = ContainerFinder;
//# sourceMappingURL=ContainerFinder.js.map