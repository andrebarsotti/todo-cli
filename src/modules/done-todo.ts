import inquirer from 'inquirer';
import chalk from 'chalk';
import { ToDoService } from './todo-service';

export async function doneTodo(index: string, service: ToDoService): Promise<void> {
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
    await service.markAsDone(+index || resposta.index);
    console.log(chalk.green('Tarefa concluída com sucesso!'))
}
