import {Configuration} from "../Configuration";
import {ConsumerOptions} from "../../consumer_options/ConsumerOptions";

export declare class PlainConfiguration extends Configuration {
  images: string[];

  constructor(images: string[], consumerOptions: ConsumerOptions[]);
}
