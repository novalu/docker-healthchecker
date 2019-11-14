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
const inversify_1 = require("inversify");
const chalk = require("chalk");
const Container_1 = require("../../../model/container/Container");
const ConsoleMessageConfig_1 = require("../../../model/message_config/impl/ConsoleMessageConfig");
let ConsoleMessenger = class ConsoleMessenger {
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
            switch (container.health) {
                case Container_1.Container.STATUS_STARTING:
                    healthText = "starting";
                    break;
                case Container_1.Container.STATUS_HEALTHY:
                    healthText = this.color("green", "healthy");
                    break;
                case Container_1.Container.STATUS_UNHEALTHY:
                    healthText = this.color("red", "unhealthy");
                    break;
                case Container_1.Container.STATUS_DOWN:
                    healthText = this.color("gray", "down");
                    break;
            }
            line.push(`${container.image}: ${healthText}`);
        }
        return line.join("\n");
    }
    ;
    sendMessage(containers, messageConfig) {
        if (!(messageConfig instanceof ConsoleMessageConfig_1.ConsoleMessageConfig)) {
            throw new Error("Message config is not Console message config");
        }
        const loggerMessageConfig = messageConfig;
        const textSummary = this.getTextSummary(containers);
        console.log(textSummary);
    }
};
ConsoleMessenger = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ConsoleMessenger);
exports.ConsoleMessenger = ConsoleMessenger;
//# sourceMappingURL=ConsoleMessenger.js.map