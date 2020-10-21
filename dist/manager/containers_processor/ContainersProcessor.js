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
const types_1 = __importDefault(require("../../di/types"));
const fs = __importStar(require("fs-extra"));
const validator_1 = __importDefault(require("validator"));
const joi_1 = __importDefault(require("@hapi/joi"));
const ContainerFinder_1 = require("../container_finder/ContainerFinder");
const ContainerRequest_1 = require("./configuration/ContainerRequest");
let ContainersProcessor = class ContainersProcessor {
    constructor(containerFinder, logger) {
        this.containerFinder = containerFinder;
        this.logger = logger;
    }
    getImagesSchema() {
        return joi_1.default.array().items(joi_1.default.object({
            image: joi_1.default.string().required(),
            name: joi_1.default.string(),
            alias: joi_1.default.string(),
            useName: joi_1.default.boolean()
        }));
    }
    processImagesFile(imagesFile) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const images = [];
            const exists = yield fs.pathExists(imagesFile);
            if (exists) {
                const stat = yield fs.stat(imagesFile);
                if (stat.isFile()) {
                    const contents = (yield fs.readFile(imagesFile)).toString();
                    const isJson = validator_1.default.isJSON(contents);
                    if (isJson) {
                        const imagesDef = JSON.parse(contents);
                        const imagesSchema = this.getImagesSchema();
                        const validationResult = imagesSchema.validate(imagesDef);
                        if (!validationResult.error) {
                            for (const imageDef of imagesDef) {
                                const alias = (_a = imageDef.alias, (_a !== null && _a !== void 0 ? _a : imageDef.image));
                                images.push(new ContainerRequest_1.ContainerRequest(alias, imageDef.useName, imageDef.image, imageDef.name));
                            }
                            return images;
                        }
                        else {
                            throw new Error("Images definition file has invalid content.");
                        }
                    }
                    else {
                        throw new Error("Images definition file is not a JSON.");
                    }
                }
                else {
                    throw new Error("Images definition is not a file.");
                }
            }
            else {
                throw new Error("Images definition file does not exist.");
            }
        });
    }
    process(configuration) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const containers = [];
            const imagesResult = joi_1.default.array().items(joi_1.default.string()).validate(configuration.images); // TODO validate ContainerRequest
            if (imagesResult.error) {
                throw new Error("Provided images are not valid");
            }
            const images = [...(_a = configuration.images, (_a !== null && _a !== void 0 ? _a : []))];
            if (configuration.imagesDef) {
                images.push(...(yield this.processImagesFile(configuration.imagesDef)));
            }
            for (const image of images) {
                containers.push(yield this.containerFinder.findContainer(image));
            }
            return containers;
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