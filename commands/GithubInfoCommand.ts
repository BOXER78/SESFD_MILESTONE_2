import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import axios from 'axios';
import ora from 'ora';
import { Command } from '../cli_engine/Command';

export class GithubInfoCommand extends Command {
    name = 'github';
    description = 'Fetches GitHub user profile details';

    register(program: CommanderCommand) {
        program
            .command(`${this.name} <username>`)
            .description(this.description)
            .action(async (username) => {
                const spinner = ora(`Fetching GitHub data for ${chalk.bold(username)}...`).start();
                try {
                    const response = await axios.get(`https://api.github.com/users/${username}`);
                    const user = response.data;
                    spinner.succeed(chalk.green('Profile found!'));

                    console.log(chalk.white.bold(`\n👤 GitHub Profile: ${user.login}`));
                    console.log(chalk.gray('------------------------------------------'));
                    console.log(chalk.cyan('Full Name:    ') + (user.name || 'N/A'));
                    console.log(chalk.cyan('Bio:          ') + (user.bio || 'No bio available'));
                    console.log(chalk.cyan('Public Repos: ') + user.public_repos);
                    console.log(chalk.cyan('Followers:    ') + user.followers);
                    console.log(chalk.cyan('Following:    ') + user.following);
                    console.log(chalk.cyan('Location:     ') + (user.location || 'Unknown'));
                    console.log(chalk.cyan('Profile URL:  ') + chalk.underline(user.html_url));
                    console.log(chalk.gray('------------------------------------------\n'));
                } catch (error: any) {
                    spinner.fail(chalk.red(`Error: ${error.response?.status === 404 ? 'User not found' : 'Connection failed'}`));
                }
            });
    }
}
