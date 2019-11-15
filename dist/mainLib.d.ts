import "reflect-metadata";
import { Container } from "./model/container/Container";
export declare function containersHealth(...images: string[]): Promise<Container[]>;
