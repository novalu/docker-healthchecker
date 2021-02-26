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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleConsumer = void 0;
const inversify_1 = require("inversify");
const chalk = require("chalk");
const ContainerState_1 = require("../../container_state/ContainerState");
const ConsoleConsumerOptions_1 = require("../../consumer_options/impl/ConsoleConsumerOptions");
let ConsoleConsumer = class ConsoleConsumer {
    constructor() { }
    color(color, text) {
        if (color) {
            return chalk.hex(color)(text);
        }
        else {
            return text;
        }
    }
    getTextSummary(containers) {
        const line = [];
        for (const container of containers) {
            let healthText;
            switch (container.state.id) {
                case ContainerState_1.ContainerState.RUNNING_STARTING.id:
                    healthText = container.state.text;
                    break;
                case ContainerState_1.ContainerState.RUNNING_HEALTHY.id:
                    healthText = this.color("green", container.state.text);
                    break;
                case ContainerState_1.ContainerState.RUNNING_UNHEALTHY.id:
                    healthText = this.color("red", container.state.text);
                    break;
                case ContainerState_1.ContainerState.RUNNING_UNKNOWN.id:
                    healthText = this.color("gray", container.state.text);
                    break;
                case ContainerState_1.ContainerState.DOWN.id:
                    healthText = this.color("red", container.state.text);
                    break;
                case ContainerState_1.ContainerState.NOT_FOUND.id:
                    healthText = this.color("red", container.state.text);
                    break;
            }
            line.push(`${container.alias}: ${healthText}`);
        }
        return line.join("\n");
    }
    ;
    consume(containers, consumerOptions) {
        if (!(consumerOptions instanceof ConsoleConsumerOptions_1.ConsoleConsumerOptions)) {
            throw new Error("Consumer options is not Console consumer options");
        }
        const consoleConfig = consumerOptions;
        const textSummary = this.getTextSummary(containers);
        console.log(textSummary);
    }
};
ConsoleConsumer = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ConsoleConsumer);
exports.ConsoleConsumer = ConsoleConsumer;
//# sourceMappingURL=ConsoleConsumer.js.map