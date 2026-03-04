"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoManagerCommand = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const Command_1 = require("../cli_engine/Command");
const STORAGE_FILE = 'my_todos.json';
class TodoManagerCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.name = 'todo';
        this.description = 'Manage your local daily tasks';
    }
    register(program) {
        const todo = program.command(this.name).description(this.description);
        todo.command('add <task>')
            .description('Add a new task')
            .action((task) => {
            const todos = this.loadTodos();
            todos.push({ id: Date.now(), text: task, done: false });
            this.saveTodos(todos);
            console.log(chalk_1.default.green('✔ Task added successfully!'));
        });
        todo.command('ls')
            .description('List all tasks')
            .action(() => {
            const todos = this.loadTodos();
            if (todos.length === 0) {
                console.log(chalk_1.default.yellow('You have no tasks!'));
                return;
            }
            console.log(chalk_1.default.magenta.bold('\n📝 Your Tasks:'));
            todos.forEach((t, idx) => {
                const status = t.done ? chalk_1.default.green('[✔]') : chalk_1.default.red('[ ]');
                console.log(`${idx + 1}. ${status} ${t.text}`);
            });
            console.log('');
        });
        todo.command('done <index>')
            .description('Mark a task as done')
            .action((index) => {
            const todos = this.loadTodos();
            const idx = parseInt(index) - 1;
            if (todos[idx]) {
                todos[idx].done = true;
                this.saveTodos(todos);
                console.log(chalk_1.default.green('✔ Task marked as completed!'));
            }
            else {
                console.log(chalk_1.default.red('Invalid index.'));
            }
        });
        todo.command('clear')
            .description('Clear all tasks')
            .action(() => {
            this.saveTodos([]);
            console.log(chalk_1.default.yellow('All tasks cleared.'));
        });
    }
    loadTodos() {
        if (!fs_1.default.existsSync(STORAGE_FILE))
            return [];
        return JSON.parse(fs_1.default.readFileSync(STORAGE_FILE, 'utf-8'));
    }
    saveTodos(todos) {
        fs_1.default.writeFileSync(STORAGE_FILE, JSON.stringify(todos, null, 2));
    }
}
exports.TodoManagerCommand = TodoManagerCommand;
