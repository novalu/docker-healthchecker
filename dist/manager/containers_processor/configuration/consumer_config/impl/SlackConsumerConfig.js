"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsumerConfig_1 = require("../ConsumerConfig");
class SlackConsumerConfig extends ConsumerConfig_1.ConsumerConfig {
    constructor(webhook, force) {
        super(force);
        this.webhook = webhook;
    }
}
exports.SlackConsumerConfig = SlackConsumerConfig;
//# sourceMappingURL=SlackConsumerConfig.js.map