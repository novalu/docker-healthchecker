"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileConfiguration = void 0;
const Configuration_1 = require("../Configuration");
class FileConfiguration extends Configuration_1.Configuration {
    constructor(filePath, consumerOptions) {
        super(Configuration_1.Configuration.TYPE_FILE, consumerOptions);
        this.filePath = filePath;
    }
}
exports.FileConfiguration = FileConfiguration;
//# sourceMappingURL=FileConfiguration.js.map