declare abstract class ConsumerOptions {
  force: boolean;
  static readonly CONSUMER_TYPE_CONSOLE = 1;
  static readonly CONSUMER_TYPE_LOGGER = 2;
  static readonly CONSUMER_TYPE_SLACK = 3;
  abstract type: number;

  constructor(force: boolean);
}

export {ConsumerOptions};
