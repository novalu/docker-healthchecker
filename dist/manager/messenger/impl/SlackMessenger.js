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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../../di/types"));
const webhook_1 = require("@slack/webhook");
const SlackMessageConfig_1 = require("../../../model/message_config/impl/SlackMessageConfig");
const lodash = __importStar(require("lodash"));
let SlackMessenger = class SlackMessenger {
    constructor(logger) {
        this.logger = logger;
    }
    createFields(containers) {
        const fields = [];
        for (const container of containers) {
            fields.push({
                title: container.image,
                value: `container is ${container.state.text}`,
                short: false
            });
        }
        return fields;
    }
    createAttachment(containers) {
        const attachment = {};
        attachment.fields = this.createFields(containers);
        const downestContainer = lodash.maxBy(containers, (container) => container.state.id);
        attachment.color = downestContainer.state.color;
        return attachment;
    }
    sendMessage(containers, messageConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(messageConfig instanceof SlackMessageConfig_1.SlackMessageConfig)) {
                throw new Error("Message config is not Slack message config");
            }
            const slackMessageConfig = messageConfig;
            const webhook = new webhook_1.IncomingWebhook(slackMessageConfig.webhook);
            yield webhook.send({
                text: "Container status",
                attachments: [this.createAttachment(containers)]
            });
            this.logger.info("Message sent");
        });
    }
};
SlackMessenger = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [Object])
], SlackMessenger);
exports.SlackMessenger = SlackMessenger;
//# sourceMappingURL=SlackMessenger.js.map