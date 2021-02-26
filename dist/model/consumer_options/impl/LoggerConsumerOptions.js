"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerConsumerOptions = void 0;
const ConsumerOptions_1 = require("../ConsumerOptions");
class LoggerConsumerOptions extends ConsumerOptions_1.ConsumerOptions {
    constructor() {
        super(...arguments);
        this.type = ConsumerOptions_1.ConsumerOptions.CONSUMER_TYPE_LOGGER;
    }
}
exports.LoggerConsumerOptions = LoggerConsumerOptions;
//# sourceMappingURL=LoggerConsumerOptions.js.map