"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.SlackConsumerOptions = void 0;
const ConsumerOptions_1 = require("../ConsumerOptions");

class SlackConsumerOptions extends ConsumerOptions_1.ConsumerOptions {
  constructor(webhook, force) {
    super(force);
    this.webhook = webhook;
    this.type = ConsumerOptions_1.ConsumerOptions.CONSUMER_TYPE_SLACK;
  }
}

exports.SlackConsumerOptions = SlackConsumerOptions;
//# sourceMappingURL=SlackConsumerOptions.js.map