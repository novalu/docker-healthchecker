"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.ContainersProcessor = void 0;
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../di/types"));
const fs = __importStar(require("fs-extra"));
const validator_1 = __importDefault(require("validator"));
const joi_1 = __importDefault(require("@hapi/joi"));
const ContainerFinder_1 = require("../container_finder/ContainerFinder");
const ContainerDefinition_1 = require("../../model/container_definition/ContainerDefinition");
const Configuration_1 = require("../../model/configuration/Configuration");
let ContainersProcessor = class ContainersProcessor {
    constructor(containerFinder, logger) {
        this.containerFinder = containerFinder;
        this.logger = logger;
    }
    getDefinitionsSchema() {
        return joi_1.default.array().items(joi_1.default.object({
            image: joi_1.default.string(),
            name: joi_1.default.string(),
            alias: joi_1.default.string().required()
        }));
    }
    processFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const containerDefinitions = [];
            const exists = yield fs.pathExists(filePath);
            if (exists) {
                const stat = yield fs.stat(filePath);
                if (stat.isFile()) {
                    const contents = (yield fs.readFile(filePath)).toString();
                    const isJson = validator_1.default.isJSON(contents);
                    if (isJson) {
                        const definitions = JSON.parse(contents);
                        const schema = this.getDefinitionsSchema();
                        const validationResult = schema.validate(definitions);
                        if (!validationResult.error) {
                            for (const definition of definitions) {
                                containerDefinitions.push(new ContainerDefinition_1.ContainerDefinition(definition.alias, definition.image, definition.name));
                            }
                        }
                        else {
                            throw new Error("Definitions file has invalid content.");
                        }
                    }
                    else {
                        throw new Error("Definitions file content is not a JSON.");
                    }
                }
                else {
                    throw new Error("Definitions is not a file.");
                }
            }
            else {
                throw new Error("Definitions file does not exist.");
            }
            return containerDefinitions;
        });
    }
    processFileConfiguration(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const definitions = yield this.processFile(configuration.filePath);
            const containers = [];
            for (const definition of definitions) {
                const container = yield this.containerFinder.getContainerByDefinition(definition);
                if (container) {
                    containers.push(container);
                }
            }
            return containers;
        });
    }
    processPlainConfiguration(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = configuration.images;
            const containers = [];
            for (const image of images) {
                const container = yield this.containerFinder.getContainerByImage(image);
                if (container) {
                    containers.push(container);
                }
            }
            return containers;
        });
    }
    process(configuration) {
        return __awaiter(this, void 0, void 0, function* () {
            if (configuration.type === Configuration_1.Configuration.TYPE_FILE) {
                return this.processFileConfiguration(configuration);
            }
            else if (configuration.type === Configuration_1.Configuration.TYPE_PLAIN) {
                return this.processPlainConfiguration(configuration);
            }
        });
    }
};
ContainersProcessor = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ContainerFinder)),
    __param(1, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [ContainerFinder_1.ContainerFinder, Object])
], ContainersProcessor);
exports.ContainersProcessor = ContainersProcessor;
//# sourceMappingURL=ContainersProcessor.js.map