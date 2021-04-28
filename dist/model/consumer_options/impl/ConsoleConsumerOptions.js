"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleConsumerOptions = void 0;
const ConsumerOptions_1 = require("../ConsumerOptions");
class ConsoleConsumerOptions extends ConsumerOptions_1.ConsumerOptions {
    constructor() {
        super(...arguments);
        this.type = ConsumerOptions_1.ConsumerOptions.CONSUMER_TYPE_CONSOLE;
    }
}
exports.ConsoleConsumerOptions = ConsoleConsumerOptions;
//# sourceMappingURL=ConsoleConsumerOptions.js.map