abstract class ConsumerOptions {
  public static readonly CONSUMER_TYPE_CONSOLE = 1;
  public static readonly CONSUMER_TYPE_LOGGER = 2;
  public static readonly CONSUMER_TYPE_SLACK = 3;

  public abstract type: number;

  constructor(
    public force: boolean
  ) {
  }
}

export {ConsumerOptions}