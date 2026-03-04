import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import { Command } from '../cli_engine/Command';

export class CalculatorCommand extends Command {
    name = 'calc';
    description = 'Standard arithmetic calculator';

    register(program: CommanderCommand) {
        program
            .command(`${this.name} <op> <a> <b>`)
            .description(this.description)
            .action((op, a, b) => {
                const valA = parseFloat(a);
                const valB = parseFloat(b);

                if (isNaN(valA) || isNaN(valB)) {
                    console.error(chalk.red('Error: Please provide numeric inputs.'));
                    return;
                }

                let res: number;
                switch (op) {
                    case 'add': res = valA + valB; break;
                    case 'sub': res = valA - valB; break;
                    case 'mul': res = valA * valB; break;
                    case 'div':
                        if (valB === 0) {
                            console.error(chalk.red('Error: Division by zero.'));
                            return;
                        }
                        res = valA / valB;
                        break;
                    default:
                        console.error(chalk.red('Error: Unknown operation. Use add, sub, mul, or div.'));
                        return;
                }

                console.log(chalk.green.bold(`\nResult: ${res}\n`));
            });
    }
}
