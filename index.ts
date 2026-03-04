#!/usr/bin/env node
import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import { CommandManager } from './cli_engine/CommandManager';
import { SystemInfoCommand } from './commands/SystemInfoCommand';
import { GithubInfoCommand } from './commands/GithubInfoCommand';
import { WeatherInfoCommand } from './commands/WeatherInfoCommand';
import { CryptoPriceCommand } from './commands/CryptoPriceCommand';
import { TodoManagerCommand } from './commands/TodoManagerCommand';
import { CalculatorCommand } from './commands/CalculatorCommand';
import { FileInfoCommand } from './commands/FileInfoCommand';
import { PasswordGenCommand } from './commands/PasswordGenCommand';
import { IPInfoCommand } from './commands/IPInfoCommand';
import { UnitConverterCommand } from './commands/UnitConverterCommand';

const program = new CommanderCommand();

program
    .name('sesd-cli')
    .description(chalk.cyan.bold('SESD CLI Workshop - Multi-purpose Toolkit'))
    .version('1.0.0');

const manager = new CommandManager(program);

manager.registerCommands([
    new SystemInfoCommand(),
    new GithubInfoCommand(),
    new WeatherInfoCommand(),
    new CryptoPriceCommand(),
    new TodoManagerCommand(),
    new CalculatorCommand(),
    new FileInfoCommand(),
    new PasswordGenCommand(),
    new IPInfoCommand(),
    new UnitConverterCommand()
]);

program.parse(process.argv);
