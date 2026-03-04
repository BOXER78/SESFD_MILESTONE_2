"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
class CommandManager {
    constructor(program) {
        this.program = program;
        this.commands = [];
    }
    registerCommand(command) {
        this.commands.push(command);
        command.register(this.program);
    }
    registerCommands(commands) {
        commands.forEach(cmd => this.registerCommand(cmd));
    }
}
exports.CommandManager = CommandManager;
