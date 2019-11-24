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
const yargs_1 = __importDefault(require("yargs"));
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./di/types"));
const ContainerChecker_1 = require("./manager/container_checker/ContainerChecker");
const ConsoleMessageConfig_1 = require("./model/message_config/impl/ConsoleMessageConfig");
const SlackMessageConfig_1 = require("./model/message_config/impl/SlackMessageConfig");
const ConfigurationProcessor_1 = require("./manager/configuration_processor/ConfigurationProcessor");
const Configuration_1 = require("./model/configuration/Configuration");
let Cli = class Cli {
    constructor(containerChecker, configurationProcessor, logger) {
        this.containerChecker = containerChecker;
        this.configurationProcessor = configurationProcessor;
        this.logger = logger;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const argv = yargs_1.default
                .help("h")
                .alias("h", "help")
                .group("image", "Images:")
                .alias("i", "image")
                .describe("image", "Docker image to check. Could be defined more times.")
                .array("image")
                .string("image")
                .describe("images-def", "JSON file with image definition in format [{image: string, alias: string}, ...]")
                .string("images-def")
                .group(["console-enabled", "console-force"], "Console output:")
                .describe("console-enabled", "Whether program should output to console")
                .describe("console-force", "Whether program should output even if containers are up")
                .group(["slack-enabled", "slack-webhook", "slack-force"], "Slack notification:")
                .describe("slack-enabled", "Whether program should send output to Slack")
                .describe("slack-webhook", "If slack output is enabled, define the Slack webhook URL")
                .implies("slack-enabled", "slack-webhook")
                .nargs("slack-webhook", 1)
                .describe("slack-force", "Whether program should send output to Slack even if containers are up")
                .fail((msg, err) => {
                console.error(msg);
                process.exit(1);
            })
                .argv;
            // console.log(JSON.stringify(argv));
            const configuration = new Configuration_1.Configuration(argv.image, argv.imagesDef);
            const containers = yield this.configurationProcessor.processConfig(configuration);
            const messageConfigs = [];
            if (argv.consoleEnabled !== undefined && argv.consoleEnabled) {
                messageConfigs.push(new ConsoleMessageConfig_1.ConsoleMessageConfig(argv.consoleForce !== undefined && argv.consoleForce));
            }
            if (argv.slackEnabled !== undefined && argv.slackEnabled) {
                const slackConfig = new SlackMessageConfig_1.SlackMessageConfig(argv.slackWebhook, argv.slackForce !== undefined && argv.slackForce);
                messageConfigs.push(slackConfig);
            }
            yield this.containerChecker.checkContainers(containers, messageConfigs);
            return true;
        });
    }
};
Cli = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ContainerChecker)),
    __param(1, inversify_1.inject(types_1.default.ConfigurationProcessor)),
    __param(2, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [ContainerChecker_1.ContainerChecker,
        ConfigurationProcessor_1.ConfigurationProcessor, Object])
], Cli);
exports.Cli = Cli;
//# sourceMappingURL=Cli.js.map