import inquirer from 'inquirer';
import chalk from 'chalk';
import { ToDoService } from './todo-service';

export async function addTodo(todo: string, done: boolean, service: ToDoService): Promise<void> {
    let resposta: { todo: string } = { todo: '' };
    if (!todo) {
        resposta = await inquirer.prompt([
            {
                type: 'input',
                name: 'todo',
                message: 'Qual é o seu tarefa?',
                validate: (value: string): boolean | string => value ? true : 'Por favor informe uma tarefa.'
            }
        ]);
    }
    await service.add(todo || resposta.todo, done);
    console.log(chalk.green('Tarefa adicionada com sucesso!'))
}
