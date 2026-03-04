"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInfoCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const os_1 = __importDefault(require("os"));
const Command_1 = require("../cli_engine/Command");
class SystemInfoCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'system';
        this.description = 'Displays detailed system and hardware information';
    }
    register(program) {
        program
            .command(this.name)
            .description(this.description)
            .action(() => {
            console.log(chalk_1.default.blue.bold('\n🖥  System Information'));
            console.log(chalk_1.default.gray('------------------------------------------'));
            console.log(chalk_1.default.cyan('OS Type:      ') + os_1.default.type());
            console.log(chalk_1.default.cyan('Platform:     ') + os_1.default.platform());
            console.log(chalk_1.default.cyan('Release:      ') + os_1.default.release());
            console.log(chalk_1.default.cyan('Architecture: ') + os_1.default.arch());
            console.log(chalk_1.default.cyan('CPU Model:    ') + os_1.default.cpus()[0].model);
            console.log(chalk_1.default.cyan('Total Memory: ') + (os_1.default.totalmem() / (Math.pow(1024, 3))).toFixed(2) + ' GB');
            console.log(chalk_1.default.cyan('Free Memory:  ') + (os_1.default.freemem() / (Math.pow(1024, 3))).toFixed(2) + ' GB');
            console.log(chalk_1.default.cyan('Uptime:       ') + (os_1.default.uptime() / 3600).toFixed(2) + ' hours');
            console.log(chalk_1.default.gray('------------------------------------------\n'));
        });
    }
}
exports.SystemInfoCommand = SystemInfoCommand;
