"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatorCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const Command_1 = require("../cli_engine/Command");
class CalculatorCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'calc';
        this.description = 'Standard arithmetic calculator';
    }
    register(program) {
        program
            .command(`${this.name} <op> <a> <b>`)
            .description(this.description)
            .action((op, a, b) => {
            const valA = parseFloat(a);
            const valB = parseFloat(b);
            if (isNaN(valA) || isNaN(valB)) {
                console.error(chalk_1.default.red('Error: Please provide numeric inputs.'));
                return;
            }
            let res;
            switch (op) {
                case 'add':
                    res = valA + valB;
                    break;
                case 'sub':
                    res = valA - valB;
                    break;
                case 'mul':
                    res = valA * valB;
                    break;
                case 'div':
                    if (valB === 0) {
                        console.error(chalk_1.default.red('Error: Division by zero.'));
                        return;
                    }
                    res = valA / valB;
                    break;
                default:
                    console.error(chalk_1.default.red('Error: Unknown operation. Use add, sub, mul, or div.'));
                    return;
            }
            console.log(chalk_1.default.green.bold(`\nResult: ${res}\n`));
        });
    }
}
exports.CalculatorCommand = CalculatorCommand;
