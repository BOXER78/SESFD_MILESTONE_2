import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import { Command } from '../cli_engine/Command';

export class IPInfoCommand extends Command {
    name = 'ipinfo';
    description = 'Retrieves public IP and location information';

    register(program: CommanderCommand) {
        program
            .command(this.name)
            .description(this.description)
            .action(async () => {
                const spinner = ora('Fetching network information...').start();
                try {
                    const response = await axios.get('http://ip-api.com/json/');
                    const data = response.data;
                    spinner.succeed(chalk.green('Network data received!'));

                    console.log(chalk.magenta.bold('\n🌐 IP & Network Information'));
                    console.log(chalk.gray('------------------------------------------'));
                    console.log(chalk.cyan('Public IP:   ') + data.query);
                    console.log(chalk.cyan('Location:    ') + `${data.city}, ${data.regionName}, ${data.country}`);
                    console.log(chalk.cyan('ISP:         ') + data.isp);
                    console.log(chalk.cyan('Lat/Long:    ') + `${data.lat}, ${data.lon}`);
                    console.log(chalk.cyan('Timezone:    ') + data.timezone);
                    console.log(chalk.gray('------------------------------------------\n'));
                } catch (error) {
                    spinner.fail(chalk.red('Error: Failed to fetch location data.'));
                }
            });
    }
}
