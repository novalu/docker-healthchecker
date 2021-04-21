"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlainConfiguration = void 0;
const Configuration_1 = require("../Configuration");
class PlainConfiguration extends Configuration_1.Configuration {
    constructor(images, consumerOptions) {
        super(Configuration_1.Configuration.TYPE_PLAIN, consumerOptions);
        this.images = images;
    }
}
exports.PlainConfiguration = PlainConfiguration;
//# sourceMappingURL=PlainConfiguration.js.map