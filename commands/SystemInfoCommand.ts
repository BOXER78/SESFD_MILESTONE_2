import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import os from 'os';
import { Command } from '../cli_engine/Command';

export class SystemInfoCommand extends Command {
    name = 'system';
    description = 'Displays detailed system and hardware information';

    register(program: CommanderCommand) {
        program
            .command(this.name)
            .description(this.description)
            .action(() => {
                console.log(chalk.blue.bold('\n🖥  System Information'));
                console.log(chalk.gray('------------------------------------------'));
                console.log(chalk.cyan('OS Type:      ') + os.type());
                console.log(chalk.cyan('Platform:     ') + os.platform());
                console.log(chalk.cyan('Release:      ') + os.release());
                console.log(chalk.cyan('Architecture: ') + os.arch());
                console.log(chalk.cyan('CPU Model:    ') + os.cpus()[0].model);
                console.log(chalk.cyan('Total Memory: ') + (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB');
                console.log(chalk.cyan('Free Memory:  ') + (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB');
                console.log(chalk.cyan('Uptime:       ') + (os.uptime() / 3600).toFixed(2) + ' hours');
                console.log(chalk.gray('------------------------------------------\n'));
            });
    }
}
