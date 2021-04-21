"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.SlackConsumer = void 0;
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../../di/types"));
const client_1 = require("@slack/client");
const SlackConsumerOptions_1 = require("../../consumer_options/impl/SlackConsumerOptions");
let SlackConsumer = class SlackConsumer {
  constructor(logger) {
    this.logger = logger;
  }

  createFields(container) {
    const fields = [];
    fields.push({
      title: "Image",
      value: container.alias,
      short: true
    });
    fields.push({
      title: "State",
      value: `container is ${container.state.text}`,
      short: true
    });
    return fields;
  }

  createAttachments(containers) {
    const attachments = [];
    for (const container of containers) {
      attachments.push({
        fields: this.createFields(container),
        color: container.state.color
      });
    }
    return attachments;
  }

  consume(containers, consumerOptions) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!(consumerOptions instanceof SlackConsumerOptions_1.SlackConsumerOptions)) {
        throw new Error("Message config is not Slack message config");
      }
      const slackConfig = consumerOptions;
      const webhook = new client_1.IncomingWebhook(slackConfig.webhook);
      yield webhook.send({
        text: "Container status",
        attachments: this.createAttachments(containers)
      });
      this.logger.info("Message sent");
    });
  }
};
SlackConsumer = __decorate([
  inversify_1.injectable(),
  __param(0, inversify_1.inject(types_1.default.Logger)),
  __metadata("design:paramtypes", [Object])
], SlackConsumer);
exports.SlackConsumer = SlackConsumer;
//# sourceMappingURL=SlackConsumer.js.map