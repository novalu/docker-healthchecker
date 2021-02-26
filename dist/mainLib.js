"use strict";
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
exports.SlackConsumer = exports.ConsoleConsumer = exports.ContainerDefinition = exports.PlainConfiguration = exports.FileConfiguration = exports.Configuration = exports.ContainerState = exports.Container = exports.containersHealth = void 0;
require("reflect-metadata");
const container_1 = __importDefault(require("./di/container"));
const types_1 = __importDefault(require("./di/types"));
const Container_1 = require("./model/container/Container");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return Container_1.Container; } });
const ConsoleLogger_1 = require("./utils/log/impl/ConsoleLogger");
const ContainerState_1 = require("./model/container_state/ContainerState");
Object.defineProperty(exports, "ContainerState", { enumerable: true, get: function () { return ContainerState_1.ContainerState; } });
const Configuration_1 = require("./model/configuration/Configuration");
Object.defineProperty(exports, "Configuration", { enumerable: true, get: function () { return Configuration_1.Configuration; } });
const ContainerDefinition_1 = require("./model/container_definition/ContainerDefinition");
Object.defineProperty(exports, "ContainerDefinition", { enumerable: true, get: function () { return ContainerDefinition_1.ContainerDefinition; } });
const ConsoleConsumer_1 = require("./model/consumer/impl/ConsoleConsumer");
Object.defineProperty(exports, "ConsoleConsumer", { enumerable: true, get: function () { return ConsoleConsumer_1.ConsoleConsumer; } });
const SlackConsumer_1 = require("./model/consumer/impl/SlackConsumer");
Object.defineProperty(exports, "SlackConsumer", { enumerable: true, get: function () { return SlackConsumer_1.SlackConsumer; } });
const PlainConfiguration_1 = require("./model/configuration/impl/PlainConfiguration");
Object.defineProperty(exports, "PlainConfiguration", { enumerable: true, get: function () { return PlainConfiguration_1.PlainConfiguration; } });
const FileConfiguration_1 = require("./model/configuration/impl/FileConfiguration");
Object.defineProperty(exports, "FileConfiguration", { enumerable: true, get: function () { return FileConfiguration_1.FileConfiguration; } });
const containersHealth = function containersHealth(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        container_1.default.bind(types_1.default.Logger).to(ConsoleLogger_1.ConsoleLogger);
        const lib = container_1.default.get(types_1.default.Lib);
        return yield lib.check(configuration);
    });
};
exports.containersHealth = containersHealth;
//# sourceMappingURL=mainLib.js.map