import { Command as CommanderCommand } from 'commander';

export abstract class Command {
    abstract name: string;
    abstract description: string;

    abstract register(program: CommanderCommand): void;
}
