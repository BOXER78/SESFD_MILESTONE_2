"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordGenCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const Command_1 = require("../cli_engine/Command");
class PasswordGenCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'passgen';
        this.description = 'Generates a secure random password';
    }
    register(program) {
        program
            .command(this.name)
            .description(this.description)
            .option('-l, --length <number>', 'Length of password', '12')
            .option('-s, --symbols', 'Include symbols')
            .action((options) => {
            const length = parseInt(options.length);
            let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            if (options.symbols)
                chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
            let password = '';
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            console.log(chalk_1.default.green.bold(`\nGenerated Password: `) + chalk_1.default.white(password) + '\n');
        });
    }
}
exports.PasswordGenCommand = PasswordGenCommand;
