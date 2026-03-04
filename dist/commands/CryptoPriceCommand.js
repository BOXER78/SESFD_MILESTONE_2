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
exports.CryptoPriceCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const axios_1 = __importDefault(require("axios"));
const ora_1 = __importDefault(require("ora"));
const Command_1 = require("../cli_engine/Command");
class CryptoPriceCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'crypto';
        this.description = 'Fetches live cryptocurrency prices';
    }
    register(program) {
        program
            .command(`${this.name} <coin>`)
            .description(this.description)
            .action((coin) => __awaiter(this, void 0, void 0, function* () {
            const spinner = (0, ora_1.default)(`Fetching price for ${chalk_1.default.bold(coin)}...`).start();
            try {
                const response = yield axios_1.default.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.toLowerCase()}&vs_currencies=usd&include_24hr_change=true`);
                const data = response.data[coin.toLowerCase()];
                if (!data) {
                    spinner.fail(chalk_1.default.red(`Error: Coin "${coin}" not found.`));
                    return;
                }
                spinner.succeed(chalk_1.default.green('Price fetched!'));
                const change = data.usd_24h_change || 0;
                const changeColor = change >= 0 ? chalk_1.default.bold.green : chalk_1.default.bold.red;
                console.log(chalk_1.default.yellow.bold(`\n🪙  ${coin.toUpperCase()} Market Data`));
                console.log(chalk_1.default.gray('------------------------------------------'));
                console.log(chalk_1.default.cyan('Current Price: ') + chalk_1.default.bold(`$${data.usd.toLocaleString()}`));
                console.log(chalk_1.default.cyan('24h Change:    ') + changeColor(`${change.toFixed(2)}%`));
                console.log(chalk_1.default.gray('------------------------------------------\n'));
            }
            catch (error) {
                spinner.fail(chalk_1.default.red('Error: API rate limit reached or server down.'));
            }
        }));
    }
}
exports.CryptoPriceCommand = CryptoPriceCommand;
