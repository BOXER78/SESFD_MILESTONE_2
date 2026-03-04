import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { Command } from '../cli_engine/Command';

export class FileInfoCommand extends Command {
    name = 'fileinfo';
    description = 'Shows metadata for a file or directory';

    register(program: CommanderCommand) {
        program
            .command(`${this.name} <path>`)
            .description(this.description)
            .action((targetPath) => {
                const fullPath = path.resolve(targetPath);
                if (!fs.existsSync(fullPath)) {
                    console.log(chalk.red(`Error: Path does not exist: ${fullPath}`));
                    return;
                }

                const stats = fs.statSync(fullPath);
                const isDir = stats.isDirectory();

                console.log(chalk.cyan.bold(`\n📄 Meta Information`));
                console.log(chalk.gray('------------------------------------------'));
                console.log(chalk.white('Name:      ') + path.basename(fullPath));
                console.log(chalk.white('Type:      ') + (isDir ? '📁 Directory' : '📄 File'));
                console.log(chalk.white('Size:      ') + (stats.size / 1024).toFixed(2) + ' KB');
                console.log(chalk.white('Created:   ') + stats.birthtime.toLocaleString());
                console.log(chalk.white('Modified:  ') + stats.mtime.toLocaleString());
                console.log(chalk.gray('------------------------------------------\n'));
            });
    }
}
