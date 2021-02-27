import "reflect-metadata";
import container from "../di/container";
import TYPES from "../di/types";
import PrettyError from "pretty-error";

import { App } from "../App";
import {Logger} from "../utils/log/Logger";
import {SignaleLogger} from "../utils/log/impl/SignaleLogger";
import {NoOpLogger} from "../utils/log/impl/NoOpLogger";
import { Lib } from "./Lib";
import { Container } from "../model/container/Container";
import {ConsoleLogger} from "../utils/log/impl/ConsoleLogger";
import { ContainerState} from "../model/container_state/ContainerState";
import { Configuration } from "../model/configuration/Configuration";
import { ContainerDefinition } from "../model/container_definition/ContainerDefinition";
import { Consumer } from "../model/consumer/Consumer";
import { ConsoleConsumer } from "../model/consumer/impl/ConsoleConsumer";
import { SlackConsumer } from "../model/consumer/impl/SlackConsumer";
import { PlainConfiguration} from "../model/configuration/impl/PlainConfiguration";
import { FileConfiguration } from "../model/configuration/impl/FileConfiguration";
import { ConsoleConsumerOptions } from "../model/consumer_options/impl/ConsoleConsumerOptions";
import { SlackConsumerOptions } from "../model/consumer_options/impl/SlackConsumerOptions";
import { LoggerConsumerOptions } from "../model/consumer_options/impl/LoggerConsumerOptions";

const containersHealth = async function containersHealth(configuration: Configuration): Promise<Container[]> {
    container.bind<Logger>(TYPES.Logger).to(ConsoleLogger);

    const lib = container.get<Lib>(TYPES.Lib);
    return await lib.check(configuration);
}

export { containersHealth, Container, ContainerState, Configuration, FileConfiguration, PlainConfiguration, ContainerDefinition, Consumer, ConsoleConsumer, SlackConsumer, ConsoleConsumerOptions, SlackConsumerOptions, LoggerConsumerOptions }