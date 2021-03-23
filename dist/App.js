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
exports.App = void 0;
const yargs_1 = __importDefault(require("yargs"));
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./di/types"));
const ContainerStateMonitor_1 = require("./manager/container_state_monitor/ContainerStateMonitor");
const ContainersProcessor_1 = require("./manager/containers_processor/ContainersProcessor");
const lodash_1 = __importDefault(require("lodash"));
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
                .group(["image", "file"], "Images:")
                .alias("i", "image")
                .describe("image", "Docker image to check. Could be defined more times.")
                .array("image")
                .string("image")
                .alias("f", "file")
                .describe("file", "JSON file with image definition in format [{name: string, image: string, alias: string}, ...], where there should be at least name or image. Alias is optional.")
                .string("file")
                .group(["console", "console-force"], "Console output:")
                .describe("console", "Whether program should output to console")
                .describe("console-force", "Whether program should output even if containers are up")
                .group(["slack", "slack-webhook", "slack-force"], "Slack notification:")
                .describe("slack", "Whether program should send output to Slack")
                .describe("slack-webhook", "If slack output is enabled, define the Slack webhook URL")
                .implies("slack", "slack-webhook")
                .nargs("slack-webhook", 1)
                .describe("slack-force", "Whether program should send output to Slack even if containers are up")
                .fail((msg, err) => {
                console.error(msg);
                process.exit(1);
            })
                .argv;
            // console.log(JSON.stringify(argv));
            // TODO validate with joi
            const consumerOptions = [];
            if (argv.console !== undefined && lodash_1.default.isBoolean(argv.console) && argv.console) {
                const consoleForce = (argv.consoleForce !== undefined && lodash_1.default.isBoolean(argv.consoleForce)) ? argv.consoleForce : false;
                consumerOptions.push(new ConsoleConsumerOptions_1.ConsoleConsumerOptions(consoleForce));
            }
            if (argv.slack !== undefined && lodash_1.default.isBoolean(argv.slack) && argv.slack) {
                const slackWebhook = argv.slackWebhook;
                const slackForce = (argv.slackForce !== undefined && lodash_1.default.isBoolean(argv.slackForce)) ? argv.slackForce : false;
                consumerOptions.push(new SlackConsumerOptions_1.SlackConsumerOptions(slackWebhook, slackForce));
            }
            let configuration;
            if (argv.image !== undefined) {
                configuration = new PlainConfiguration_1.PlainConfiguration(argv.image, consumerOptions);
            }
            else if (argv.file !== undefined) {
                configuration = new FileConfiguration_1.FileConfiguration(argv.file, consumerOptions);
            }
            else {
                console.log("Image or file parameter should be provided.");
                return;
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