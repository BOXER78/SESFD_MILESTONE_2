import { Command as CommanderCommand } from 'commander';
import { Command } from './Command';

export class CommandManager {
    private commands: Command[] = [];

    constructor(private program: CommanderCommand) { }

    public registerCommand(command: Command) {
        this.commands.push(command);
        command.register(this.program);
    }

    public registerCommands(commands: Command[]) {
        commands.forEach(cmd => this.registerCommand(cmd));
    }
}
