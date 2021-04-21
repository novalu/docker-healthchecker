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
exports.App = void 0;
const yargs_1 = __importDefault(require("yargs"));
const inversify_1 = require("inversify");
const joi_1 = __importDefault(require("joi"));
const types_1 = __importDefault(require("./di/types"));
const ContainerStateMonitor_1 = require("./manager/container_state_monitor/ContainerStateMonitor");
const ContainersProcessor_1 = require("./manager/containers_processor/ContainersProcessor");
const PlainConfiguration_1 = require("./model/configuration/impl/PlainConfiguration");
const FileConfiguration_1 = require("./model/configuration/impl/FileConfiguration");
const ConsoleConsumerOptions_1 = require("./model/consumer_options/impl/ConsoleConsumerOptions");
const SlackConsumerOptions_1 = require("./model/consumer_options/impl/SlackConsumerOptions");
let App = class App {
  constructor(containerStateMonitor, containersProcessor, logger) {
    this.containerStateMonitor = containerStateMonitor;
    this.containersProcessor = containersProcessor;
    this.logger = logger;
  }

  start() {
    return __awaiter(this, void 0, void 0, function* () {
      const argv = yargs_1.default
        .help("h")
        .alias("h", "help")
        .group(["image", "file"], "Definition:")
        .options({
          i: {
            alias: "image",
            describe: "Docker image to check. Could be defined more times.",
            array: true,
            string: true
          },
          f: {
            alias: "file",
            describe: "JSON file with image definition in format [{name: string, image: string, alias: " +
              "string}, ...], where there should be at least name or image. Alias is optional.",
            type: "string",
            nargs: 1
          }
        })
        .group(["console", "slack", "slack-webhook"], "Output:")
        .options({
          c: {
            alias: "console",
            describe: "Whether program should output to console"
          },
          s: {
            alias: "slack",
            describe: "Whether program should send Slack notification"
          },
          slackWebhook: {
            describe: "If slack output is enabled, define the Slack webhook URL",
            nargs: 1
          },
          force: {
            describe: "Whether program should output even if containers are up"
          }
        })
        .fail((msg, err) => {
          this.logger.error("Failed validate CLI parameters", err);
          process.exit(1);
        })
        .argv;
      this.logger.debug("Yargs:");
      this.logger.debug(JSON.stringify(argv));
      const schema = joi_1.default.object({
        image: joi_1.default.array().items(joi_1.default.string()),
        file: joi_1.default.string(),
        force: joi_1.default.bool().default(false),
        console: joi_1.default.bool().default(false),
        slack: joi_1.default.bool().default(false),
        slackWebhook: joi_1.default.string().default("").uri().when("slack", {is: true, then: joi_1.default.required()})
      });
      const options = schema.validate(argv, {allowUnknown: true});
      if (options.error) {
        this.logger.error("Failed validate CLI parameters", options.error);
        process.exit(1);
      }
      const image = options.value.image;
      const file = options.value.file;
      const force = options.value.force;
      const consoleVal = options.value.console;
      const slack = options.value.slack;
      const slackWebhook = options.value.slackWebhook;
      this.logger.debug("Joi:");
      this.logger.debug(JSON.stringify({image, file, force, console: consoleVal, slack, slackWebhook}));
      if ((!image && !file) || (image && file)) {
        this.logger.error("Only one of image and file should be provided");
      }
      if (!consoleVal && !slack) {
        this.logger.error("Console or Slack output should be provided");
      }
      return;
      const consumerOptions = [];
      if (consoleVal)
        consumerOptions.push(new ConsoleConsumerOptions_1.ConsoleConsumerOptions(force));
      if (slack)
        consumerOptions.push(new SlackConsumerOptions_1.SlackConsumerOptions(slackWebhook, force));
      let configuration;
      if (image.length > 0) {
        configuration = new PlainConfiguration_1.PlainConfiguration(image, consumerOptions);
      } else if (file) {
        configuration = new FileConfiguration_1.FileConfiguration(file, consumerOptions);
      }
      const containers = yield this.containersProcessor.process(configuration);
      yield this.containerStateMonitor.processState(containers, configuration);
      return true;
    });
  }
};
App = __decorate([
  inversify_1.injectable(),
  __param(0, inversify_1.inject(types_1.default.ContainerStateMonitor)),
  __param(1, inversify_1.inject(types_1.default.ContainersProcessor)),
  __param(2, inversify_1.inject(types_1.default.Logger)),
  __metadata("design:paramtypes", [ContainerStateMonitor_1.ContainerStateMonitor,
    ContainersProcessor_1.ContainersProcessor, Object])
], App);
exports.App = App;
//# sourceMappingURL=App.js.map