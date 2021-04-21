import {Container} from "../../model/container/Container";
import {Logger} from "../../utils/log/Logger";
import {ContainerFinder} from "../container_finder/ContainerFinder";
import {Configuration} from "../../model/configuration/Configuration";

declare class ContainersProcessor {
  private containerFinder;
  private logger;

  constructor(containerFinder: ContainerFinder, logger: Logger);

  private getDefinitionsSchema;
  private processFile;
  private processFileConfiguration;
  private processPlainConfiguration;

  process(configuration: Configuration): Promise<Container[]>;
}

export {ContainersProcessor};
