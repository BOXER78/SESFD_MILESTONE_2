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
exports.WeatherInfoCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const axios_1 = __importDefault(require("axios"));
const ora_1 = __importDefault(require("ora"));
const Command_1 = require("../cli_engine/Command");
class WeatherInfoCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'weather';
        this.description = 'Displays current weather for any city';
    }
    register(program) {
        program
            .command(`${this.name} <city>`)
            .description(this.description)
            .action((city) => __awaiter(this, void 0, void 0, function* () {
            const spinner = (0, ora_1.default)(`Checking weather for ${chalk_1.default.bold(city)}...`).start();
            try {
                const response = yield axios_1.default.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
                const weather = response.data.current_condition[0];
                spinner.succeed(chalk_1.default.green('Weather fetched!'));
                console.log(chalk_1.default.blue.bold(`\n🌤  Weather in ${city}`));
                console.log(chalk_1.default.gray('------------------------------------------'));
                console.log(chalk_1.default.cyan('Temperature:  ') + weather.temp_C + '°C / ' + weather.temp_F + '°F');
                console.log(chalk_1.default.cyan('Condition:    ') + weather.weatherDesc[0].value);
                console.log(chalk_1.default.cyan('Humidity:     ') + weather.humidity + '%');
                console.log(chalk_1.default.cyan('Wind Speed:   ') + weather.windspeedKmph + ' km/h');
                console.log(chalk_1.default.cyan('Feels Like:   ') + weather.FeelsLikeC + '°C');
                console.log(chalk_1.default.gray('------------------------------------------\n'));
            }
            catch (error) {
                spinner.fail(chalk_1.default.red('Error: City not found or API unavailable.'));
            }
        }));
    }
}
exports.WeatherInfoCommand = WeatherInfoCommand;
