import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import { Command } from '../cli_engine/Command';

export class WeatherInfoCommand extends Command {
    name = 'weather';
    description = 'Displays current weather for any city';

    register(program: CommanderCommand) {
        program
            .command(`${this.name} <city>`)
            .description(this.description)
            .action(async (city) => {
                const spinner = ora(`Checking weather for ${chalk.bold(city)}...`).start();
                try {
                    const response = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
                    const weather = response.data.current_condition[0];
                    spinner.succeed(chalk.green('Weather fetched!'));

                    console.log(chalk.blue.bold(`\n🌤  Weather in ${city}`));
                    console.log(chalk.gray('------------------------------------------'));
                    console.log(chalk.cyan('Temperature:  ') + weather.temp_C + '°C / ' + weather.temp_F + '°F');
                    console.log(chalk.cyan('Condition:    ') + weather.weatherDesc[0].value);
                    console.log(chalk.cyan('Humidity:     ') + weather.humidity + '%');
                    console.log(chalk.cyan('Wind Speed:   ') + weather.windspeedKmph + ' km/h');
                    console.log(chalk.cyan('Feels Like:   ') + weather.FeelsLikeC + '°C');
                    console.log(chalk.gray('------------------------------------------\n'));
                } catch (error) {
                    spinner.fail(chalk.red('Error: City not found or API unavailable.'));
                }
            });
    }
}
