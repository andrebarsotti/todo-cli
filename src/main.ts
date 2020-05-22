#!/usr/bin/env node
import { program as app } from 'commander';
import * as pkg from './version.json';
import * as path from 'path';
import { ToDoRepositoryImplementation } from './repositories/todo-repository-implementation';
import { ToDoService } from './services/todo-service';
import inquirer from 'inquirer';
import chalk from 'chalk';
import Table from 'cli-table';
import shelljs from 'shelljs'
import figlet from 'figlet';

app.version(pkg.version);

//Cria o diretório data
const pathDir = path.join(__dirname, 'data');
shelljs.mkdir('-p', pathDir);

//Caminhos
const arquivo = path.join(pathDir,'db.json');
const repositorio = new ToDoRepositoryImplementation(arquivo);
const service = new ToDoService(repositorio);

const showTodoTable =  async (): Promise<void> => {
    const table = new Table({
        head: ['#', 'Tarefa', 'Concluído'],
        colAligns: ['right', 'left', 'middle']
    });
    const dados = await repositorio.getToDoList();
    dados.map((todo, index) => table.push([index, todo.title, todo.done ? chalk.green('X') : '' ]));
    console.log(table.toString());
}

app.on('--help', () => {
    console.log('');
    console.log(chalk.cyan(figlet.textSync('To-Do CLI')));
    console.log('');
});

//Comandos
app.command('add [todo]')
   .description('Adiciona um tarefa.')
   .action(async (todo) => 
    {
        let resposta: { todo?: string } = { };
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
    });
    
    app.command('done [index]')
    .description('Conclui uma tarefa.')
    .action(async (index) => {
        let resposta: { index?: number } = {};
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
        lista[index || resposta.index].done = true
        repositorio.saveToDoList(lista);
        console.log(chalk.green('Tarefa concluída com sucesso!'))
    })

app.command('ls')
   .description('Lista as tarefas')
   .action(async () => await showTodoTable());

app.command('clear')
   .description('Limpa a lista de tarefas')
   .action(() => {
       shelljs.rm('data/*.json')
    });

app.parse(process.argv);
