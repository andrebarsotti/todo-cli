import fs from 'fs';
import util from 'util';
import shelljs from 'shelljs'
import path from 'path'
import { ToDo } from '../entities/todo';
import { ToDoRepository } from '../services/todo-repository';


const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const enconding = 'utf8'
const arquivoNaoEncontrado = 'ENOENT';

export class ToDoRepositoryImplementation implements ToDoRepository {

    constructor(private nomeArquivo: string) {
        shelljs.mkdir('-p', path.dirname(nomeArquivo));
    }
    
    async getToDoList(): Promise<ToDo[]> {
        let data: ToDo[] = [];
        try {
            data = JSON.parse(await readFile(this.nomeArquivo, enconding));
        }
        catch(ex){
            if (ex.code !== arquivoNaoEncontrado)
                throw ex;
        }
        return data; 
    }
    
    async saveToDoList(list: ToDo[]): Promise<void> {
        await writeFile(this.nomeArquivo, JSON.stringify(list), enconding);
    }
}
