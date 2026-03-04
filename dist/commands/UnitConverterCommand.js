"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitConverterCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const Command_1 = require("../cli_engine/Command");
class UnitConverterCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'unit';
        this.description = 'Converts units (c-f, f-c, km-mi, mi-km)';
    }
    register(program) {
        program
            .command(`${this.name} <type> <value>`)
            .description(this.description)
            .addHelpText('after', `
Types:
  c-f    Celsius to Fahrenheit
  f-c    Fahrenheit to Celsius
  km-mi  Kilometers to Miles
  mi-km  Miles to Kilometers
            `)
            .action((type, value) => {
            const val = parseFloat(value);
            if (isNaN(val)) {
                console.log(chalk_1.default.red('Error: Value must be a number.'));
                return;
            }
            let result;
            switch (type.toLowerCase()) {
                case 'c-f':
                    result = `${(val * 9 / 5 + 32).toFixed(2)} °F`;
                    break;
                case 'f-c':
                    result = `${((val - 32) * 5 / 9).toFixed(2)} °C`;
                    break;
                case 'km-mi':
                    result = `${(val * 0.621371).toFixed(2)} miles`;
                    break;
                case 'mi-km':
                    result = `${(val / 0.621371).toFixed(2)} km`;
                    break;
                default:
                    console.log(chalk_1.default.red('Error: Invalid conversion type.'));
                    return;
            }
            console.log(chalk_1.default.green.bold(`\nConverted Value: ${result}\n`));
        });
    }
}
exports.UnitConverterCommand = UnitConverterCommand;
