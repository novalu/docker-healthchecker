import {Configuration} from "../Configuration";
import {ConsumerOptions} from "../../consumer_options/ConsumerOptions";

export declare class FileConfiguration extends Configuration {
  filePath: string;

  constructor(filePath: string, consumerOptions: ConsumerOptions[]);
}
