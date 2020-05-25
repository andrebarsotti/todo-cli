#!/usr/bin/env node
import * as path from 'path';
import { program as app } from 'commander';
import * as pkg from './version.json';
import { ToDoRepositoryImplementation } from './repositories/todo-repository-implementation';
import { ToDoServiceImplementation } from './services/todo-service-implementation';
import { help, listTodo, addTodo, doneTodo, clear } from './modules';

//Configuração
const arquivo = path.join(__dirname, 'data','db.json');
const repositorio = new ToDoRepositoryImplementation(arquivo);
const service = new ToDoServiceImplementation(repositorio);

app.version(pkg.version);

// Customização do help
app.on('--help', help);

//Comandos
app.command('add [todo]')
   .description('Adiciona um tarefa.')
   .option('-d --done', 'Marca a tarefa como concluída')
   .action(async (todo, options) => addTodo(todo, options.done, service));
    
app.command('done [index]')
   .description('Conclui uma tarefa.')
   .action(async (index) => await doneTodo(index, service));

app.command('ls')
   .description('Lista as tarefas')
   .action(async () => await listTodo(repositorio));

app.command('clear')
   .description('Limpa a lista de tarefas')
   .action(() => clear(arquivo));

app.parse(process.argv);
