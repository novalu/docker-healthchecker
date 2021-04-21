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
exports.ContainerStateMonitor = void 0;
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../di/types"));
const lodash_1 = __importDefault(require("lodash"));
const ContainerState_1 = require("../../model/container_state/ContainerState");
const LoggerConsumer_1 = require("../../model/consumer/impl/LoggerConsumer");
const ConsoleConsumer_1 = require("../../model/consumer/impl/ConsoleConsumer");
const SlackConsumer_1 = require("../../model/consumer/impl/SlackConsumer");
const ConsumerOptions_1 = require("../../model/consumer_options/ConsumerOptions");
let ContainerStateMonitor = class ContainerStateMonitor {
  constructor(logger, slackConsumer, loggerConsumer, consoleConsumer) {
    this.logger = logger;
    this.slackConsumer = slackConsumer;
    this.loggerConsumer = loggerConsumer;
    this.consoleConsumer = consoleConsumer;
  }

  processState(containers, configuration) {
    return __awaiter(this, void 0, void 0, function* () {
      const everyHealthy = lodash_1.default.every(containers, (container) => {
        return container.state.id === ContainerState_1.ContainerState.RUNNING_HEALTHY.id;
      });
      for (const consumerOptions of configuration.consumerOptions) {
        let consumer;
        switch (consumerOptions.type) {
          case ConsumerOptions_1.ConsumerOptions.CONSUMER_TYPE_SLACK:
            consumer = this.slackConsumer;
            break;
          case ConsumerOptions_1.ConsumerOptions.CONSUMER_TYPE_LOGGER:
            consumer = this.loggerConsumer;
            break;
          case ConsumerOptions_1.ConsumerOptions.CONSUMER_TYPE_CONSOLE:
            consumer = this.consoleConsumer;
            break;
        }
        if (!everyHealthy || consumerOptions.force) {
          yield consumer.consume(containers, consumerOptions);
        }
      }
    });
  }
};
ContainerStateMonitor = __decorate([
  inversify_1.injectable(),
  __param(0, inversify_1.inject(types_1.default.Logger)),
  __param(1, inversify_1.inject(types_1.default.SlackConsumer)),
  __param(2, inversify_1.inject(types_1.default.LoggerConsumer)),
  __param(3, inversify_1.inject(types_1.default.ConsoleConsumer)),
  __metadata("design:paramtypes", [Object, SlackConsumer_1.SlackConsumer,
    LoggerConsumer_1.LoggerConsumer,
    ConsoleConsumer_1.ConsoleConsumer])
], ContainerStateMonitor);
exports.ContainerStateMonitor = ContainerStateMonitor;
//# sourceMappingURL=ContainerStateMonitor.js.map