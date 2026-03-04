#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const CommandManager_1 = require("./cli_engine/CommandManager");
const SystemInfoCommand_1 = require("./commands/SystemInfoCommand");
const GithubInfoCommand_1 = require("./commands/GithubInfoCommand");
const WeatherInfoCommand_1 = require("./commands/WeatherInfoCommand");
const CryptoPriceCommand_1 = require("./commands/CryptoPriceCommand");
const TodoManagerCommand_1 = require("./commands/TodoManagerCommand");
const CalculatorCommand_1 = require("./commands/CalculatorCommand");
const FileInfoCommand_1 = require("./commands/FileInfoCommand");
const PasswordGenCommand_1 = require("./commands/PasswordGenCommand");
const IPInfoCommand_1 = require("./commands/IPInfoCommand");
const UnitConverterCommand_1 = require("./commands/UnitConverterCommand");
const program = new commander_1.Command();
program
    .name('sesd-cli')
    .description(chalk_1.default.cyan.bold('SESD CLI Workshop - Multi-purpose Toolkit'))
    .version('1.0.0');
const manager = new CommandManager_1.CommandManager(program);
manager.registerCommands([
    new SystemInfoCommand_1.SystemInfoCommand(),
    new GithubInfoCommand_1.GithubInfoCommand(),
    new WeatherInfoCommand_1.WeatherInfoCommand(),
    new CryptoPriceCommand_1.CryptoPriceCommand(),
    new TodoManagerCommand_1.TodoManagerCommand(),
    new CalculatorCommand_1.CalculatorCommand(),
    new FileInfoCommand_1.FileInfoCommand(),
    new PasswordGenCommand_1.PasswordGenCommand(),
    new IPInfoCommand_1.IPInfoCommand(),
    new UnitConverterCommand_1.UnitConverterCommand()
]);
program.parse(process.argv);
