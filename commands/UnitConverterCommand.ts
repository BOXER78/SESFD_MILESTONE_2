import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import { Command } from '../cli_engine/Command';

export class UnitConverterCommand extends Command {
    name = 'unit';
    description = 'Converts units (c-f, f-c, km-mi, mi-km)';

    register(program: CommanderCommand) {
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
                    console.log(chalk.red('Error: Value must be a number.'));
                    return;
                }

                let result: string;
                switch (type.toLowerCase()) {
                    case 'c-f': result = `${(val * 9 / 5 + 32).toFixed(2)} °F`; break;
                    case 'f-c': result = `${((val - 32) * 5 / 9).toFixed(2)} °C`; break;
                    case 'km-mi': result = `${(val * 0.621371).toFixed(2)} miles`; break;
                    case 'mi-km': result = `${(val / 0.621371).toFixed(2)} km`; break;
                    default:
                        console.log(chalk.red('Error: Invalid conversion type.'));
                        return;
                }

                console.log(chalk.green.bold(`\nConverted Value: ${result}\n`));
            });
    }
}
