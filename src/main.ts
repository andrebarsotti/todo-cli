import { program as app } from 'commander';
import * as pkg from './version.json';

app.version(pkg.version);

app
    .command('add [todo]')
    .description('Adiciona um to-do')
    .action((todo) => {
        console.log(todo);
    });

app.parse(process.argv);
