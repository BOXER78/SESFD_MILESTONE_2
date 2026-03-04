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
exports.IPInfoCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const axios_1 = __importDefault(require("axios"));
const ora_1 = __importDefault(require("ora"));
const Command_1 = require("../cli_engine/Command");
class IPInfoCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'ipinfo';
        this.description = 'Retrieves public IP and location information';
    }
    register(program) {
        program
            .command(this.name)
            .description(this.description)
            .action(() => __awaiter(this, void 0, void 0, function* () {
            const spinner = (0, ora_1.default)('Fetching network information...').start();
            try {
                const response = yield axios_1.default.get('http://ip-api.com/json/');
                const data = response.data;
                spinner.succeed(chalk_1.default.green('Network data received!'));
                console.log(chalk_1.default.magenta.bold('\n🌐 IP & Network Information'));
                console.log(chalk_1.default.gray('------------------------------------------'));
                console.log(chalk_1.default.cyan('Public IP:   ') + data.query);
                console.log(chalk_1.default.cyan('Location:    ') + `${data.city}, ${data.regionName}, ${data.country}`);
                console.log(chalk_1.default.cyan('ISP:         ') + data.isp);
                console.log(chalk_1.default.cyan('Lat/Long:    ') + `${data.lat}, ${data.lon}`);
                console.log(chalk_1.default.cyan('Timezone:    ') + data.timezone);
                console.log(chalk_1.default.gray('------------------------------------------\n'));
            }
            catch (error) {
                spinner.fail(chalk_1.default.red('Error: Failed to fetch location data.'));
            }
        }));
    }
}
exports.IPInfoCommand = IPInfoCommand;
