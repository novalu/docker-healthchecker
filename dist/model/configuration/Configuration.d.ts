import {ConsumerOptions} from "../consumer_options/ConsumerOptions";

declare class Configuration {
  type: number;
  consumerOptions: ConsumerOptions[];
  static readonly TYPE_PLAIN = 1;
  static readonly TYPE_FILE = 2;

  constructor(type: number, consumerOptions: ConsumerOptions[]);
}

export {Configuration};
