import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import { Command } from '../cli_engine/Command';

const STORAGE_FILE = 'my_todos.json';

export class TodoManagerCommand extends Command {
    name = 'todo';
    description = 'Manage your local daily tasks';

    register(program: CommanderCommand) {
        const todo = program.command(this.name).description(this.description);

        todo.command('add <task>')
            .description('Add a new task')
            .action((task) => {
                const todos = this.loadTodos();
                todos.push({ id: Date.now(), text: task, done: false });
                this.saveTodos(todos);
                console.log(chalk.green('✔ Task added successfully!'));
            });

        todo.command('ls')
            .description('List all tasks')
            .action(() => {
                const todos = this.loadTodos();
                if (todos.length === 0) {
                    console.log(chalk.yellow('You have no tasks!'));
                    return;
                }
                console.log(chalk.magenta.bold('\n📝 Your Tasks:'));
                todos.forEach((t: any, idx: number) => {
                    const status = t.done ? chalk.green('[✔]') : chalk.red('[ ]');
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
                    console.log(chalk.green('✔ Task marked as completed!'));
                } else {
                    console.log(chalk.red('Invalid index.'));
                }
            });

        todo.command('clear')
            .description('Clear all tasks')
            .action(() => {
                this.saveTodos([]);
                console.log(chalk.yellow('All tasks cleared.'));
            });
    }

    private loadTodos() {
        if (!fs.existsSync(STORAGE_FILE)) return [];
        return JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf-8'));
    }

    private saveTodos(todos: any[]) {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(todos, null, 2));
    }
}
