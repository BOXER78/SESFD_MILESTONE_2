import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import { Command } from '../cli_engine/Command';

export class PasswordGenCommand extends Command {
    name = 'passgen';
    description = 'Generates a secure random password';

    register(program: CommanderCommand) {
        program
            .command(this.name)
            .description(this.description)
            .option('-l, --length <number>', 'Length of password', '12')
            .option('-s, --symbols', 'Include symbols')
            .action((options) => {
                const length = parseInt(options.length);
                let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                if (options.symbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

                let password = '';
                for (let i = 0; i < length; i++) {
                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                }

                console.log(chalk.green.bold(`\nGenerated Password: `) + chalk.white(password) + '\n');
            });
    }
}
