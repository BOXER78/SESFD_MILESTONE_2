import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import { Command } from '../cli_engine/Command';

export class CryptoPriceCommand extends Command {
    name = 'crypto';
    description = 'Fetches live cryptocurrency prices';

    register(program: CommanderCommand) {
        program
            .command(`${this.name} <coin>`)
            .description(this.description)
            .action(async (coin) => {
                const spinner = ora(`Fetching price for ${chalk.bold(coin)}...`).start();
                try {
                    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.toLowerCase()}&vs_currencies=usd&include_24hr_change=true`);
                    const data = response.data[coin.toLowerCase()];

                    if (!data) {
                        spinner.fail(chalk.red(`Error: Coin "${coin}" not found.`));
                        return;
                    }

                    spinner.succeed(chalk.green('Price fetched!'));
                    const change = data.usd_24h_change || 0;
                    const changeColor = change >= 0 ? chalk.bold.green : chalk.bold.red;

                    console.log(chalk.yellow.bold(`\n🪙  ${coin.toUpperCase()} Market Data`));
                    console.log(chalk.gray('------------------------------------------'));
                    console.log(chalk.cyan('Current Price: ') + chalk.bold(`$${data.usd.toLocaleString()}`));
                    console.log(chalk.cyan('24h Change:    ') + changeColor(`${change.toFixed(2)}%`));
                    console.log(chalk.gray('------------------------------------------\n'));
                } catch (error) {
                    spinner.fail(chalk.red('Error: API rate limit reached or server down.'));
                }
            });
    }
}
