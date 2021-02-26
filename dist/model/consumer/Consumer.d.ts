import { Container } from "../container/Container";
import { ConsumerOptions } from "../consumer_options/ConsumerOptions";
interface Consumer {
    consume(containers: Container[], options: ConsumerOptions): any;
}
export { Consumer };
