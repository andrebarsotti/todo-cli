import { ToDoService } from '../services/todo-service';
import inquirer from 'inquirer';
import chalk from 'chalk';

export async function addTodo(todo: string, service: ToDoService): Promise<void> {
    let resposta: { todo: string } = { todo: '' };
    if (!todo) {
        resposta = await inquirer.prompt([
            {
                type: 'input',
                name: 'todo',
                message: 'Qual é o seu to-do?',
                validate: (value: string): boolean | string => value ? true : 'Por favor informe um to-do.'
            }
        ]);
    }
    await service.add(todo || resposta.todo);
    console.log(chalk.green('Tarefa adicionada com sucesso!'))
}
