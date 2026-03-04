"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInfoCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Command_1 = require("../cli_engine/Command");
class FileInfoCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'fileinfo';
        this.description = 'Shows metadata for a file or directory';
    }
    register(program) {
        program
            .command(`${this.name} <path>`)
            .description(this.description)
            .action((targetPath) => {
            const fullPath = path_1.default.resolve(targetPath);
            if (!fs_1.default.existsSync(fullPath)) {
                console.log(chalk_1.default.red(`Error: Path does not exist: ${fullPath}`));
                return;
            }
            const stats = fs_1.default.statSync(fullPath);
            const isDir = stats.isDirectory();
            console.log(chalk_1.default.cyan.bold(`\n📄 Meta Information`));
            console.log(chalk_1.default.gray('------------------------------------------'));
            console.log(chalk_1.default.white('Name:      ') + path_1.default.basename(fullPath));
            console.log(chalk_1.default.white('Type:      ') + (isDir ? '📁 Directory' : '📄 File'));
            console.log(chalk_1.default.white('Size:      ') + (stats.size / 1024).toFixed(2) + ' KB');
            console.log(chalk_1.default.white('Created:   ') + stats.birthtime.toLocaleString());
            console.log(chalk_1.default.white('Modified:  ') + stats.mtime.toLocaleString());
            console.log(chalk_1.default.gray('------------------------------------------\n'));
        });
    }
}
exports.FileInfoCommand = FileInfoCommand;
