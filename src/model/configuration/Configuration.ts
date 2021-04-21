import {ConsumerOptions} from "../consumer_options/ConsumerOptions";

class Configuration {
  public static readonly TYPE_PLAIN = 1;
  public static readonly TYPE_FILE = 2;

  constructor(
    public type: number,
    public consumerOptions: ConsumerOptions[]
  ) {
  }
}

export {Configuration}