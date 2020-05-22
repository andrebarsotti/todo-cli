import Table from 'cli-table';
import { ToDoRepository } from '../services/todo-repository';
import chalk from 'chalk';

export async function listTodo(repositorio: ToDoRepository): Promise<void> {
    const table = new Table({
        head: ['#', 'Tarefa', 'Concluído'],
        colAligns: ['right', 'left', 'middle']
    });
    const dados = await repositorio.getToDoList();
    dados.map((todo, index) => table.push([index, todo.title, todo.done ? chalk.green('X') : '' ]));
    console.log(table.toString());
}
