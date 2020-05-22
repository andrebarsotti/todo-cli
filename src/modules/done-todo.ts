import { ToDoRepository } from '../intefaces/todo-repository';
import inquirer from 'inquirer';
import chalk from 'chalk';

export async function doneTodo(index: string, repositorio: ToDoRepository): Promise<void> {
    let resposta: { index: number } = { index: 0};
    if (!index) {
        resposta = await inquirer.prompt([
            {
                type: 'input',
                name: 'index',
                message: 'Qual tarefa deseja concluir?',
                validate: (value): boolean | string => value ? true : 'Por favor informe a tarefa que será concluída.'
            }
        ]);
    }
    const lista = await repositorio.getToDoList();
    lista[+index || resposta.index].done = true
    repositorio.saveToDoList(lista);
    console.log(chalk.green('Tarefa concluída com sucesso!'))
}
