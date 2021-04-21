import {ConsumerOptions} from "../ConsumerOptions";

export declare class SlackConsumerOptions extends ConsumerOptions {
  webhook: string;
  type: number;

  constructor(webhook: string, force: boolean);
}
