"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubInfoCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const axios_1 = __importDefault(require("axios"));
const ora_1 = __importDefault(require("ora"));
const Command_1 = require("../cli_engine/Command");
class GithubInfoCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'github';
        this.description = 'Fetches GitHub user profile details';
    }
    register(program) {
        program
            .command(`${this.name} <username>`)
            .description(this.description)
            .action((username) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const spinner = (0, ora_1.default)(`Fetching GitHub data for ${chalk_1.default.bold(username)}...`).start();
            try {
                const response = yield axios_1.default.get(`https://api.github.com/users/${username}`);
                const user = response.data;
                spinner.succeed(chalk_1.default.green('Profile found!'));
                console.log(chalk_1.default.white.bold(`\n👤 GitHub Profile: ${user.login}`));
                console.log(chalk_1.default.gray('------------------------------------------'));
                console.log(chalk_1.default.cyan('Full Name:    ') + (user.name || 'N/A'));
                console.log(chalk_1.default.cyan('Bio:          ') + (user.bio || 'No bio available'));
                console.log(chalk_1.default.cyan('Public Repos: ') + user.public_repos);
                console.log(chalk_1.default.cyan('Followers:    ') + user.followers);
                console.log(chalk_1.default.cyan('Following:    ') + user.following);
                console.log(chalk_1.default.cyan('Location:     ') + (user.location || 'Unknown'));
                console.log(chalk_1.default.cyan('Profile URL:  ') + chalk_1.default.underline(user.html_url));
                console.log(chalk_1.default.gray('------------------------------------------\n'));
            }
            catch (error) {
                spinner.fail(chalk_1.default.red(`Error: ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404 ? 'User not found' : 'Connection failed'}`));
            }
        }));
    }
}
exports.GithubInfoCommand = GithubInfoCommand;
