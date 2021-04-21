import "reflect-metadata";
import {Container} from "../model/container/Container";
import {ContainerState} from "../model/container_state/ContainerState";
import {Configuration} from "../model/configuration/Configuration";
import {ContainerDefinition} from "../model/container_definition/ContainerDefinition";
import {Consumer} from "../model/consumer/Consumer";
import {ConsoleConsumer} from "../model/consumer/impl/ConsoleConsumer";
import {SlackConsumer} from "../model/consumer/impl/SlackConsumer";
import {PlainConfiguration} from "../model/configuration/impl/PlainConfiguration";
import {FileConfiguration} from "../model/configuration/impl/FileConfiguration";
import {ConsoleConsumerOptions} from "../model/consumer_options/impl/ConsoleConsumerOptions";
import {SlackConsumerOptions} from "../model/consumer_options/impl/SlackConsumerOptions";
import {LoggerConsumerOptions} from "../model/consumer_options/impl/LoggerConsumerOptions";

declare const containersHealth: (configuration: Configuration) => Promise<Container[]>;
export {
  containersHealth,
  Container,
  ContainerState,
  Configuration,
  FileConfiguration,
  PlainConfiguration,
  ContainerDefinition,
  Consumer,
  ConsoleConsumer,
  SlackConsumer,
  ConsoleConsumerOptions,
  SlackConsumerOptions,
  LoggerConsumerOptions
};
