"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageConfig_1 = require("./MessageConfig");
class SlackMessageConfig extends MessageConfig_1.MessageConfig {
    constructor(webhook, color) {
        super();
        this.webhook = webhook;
        this.color = color;
    }
}
exports.SlackMessageConfig = SlackMessageConfig;
//# sourceMappingURL=SlackMessageConfig.js.map