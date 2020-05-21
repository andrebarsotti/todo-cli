import { ToDo } from '../entities/todo';
import * as fs from 'fs';
import * as util from 'util';
import { ToDoRepository } from '../intefaces/todo-repository';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const enconding = 'utf8'
const arquivoNaoEncontrado = 'ENOENT';

export class ToDoRepositoryImplementation implements ToDoRepository {

    constructor(private path: string) {}
    
    async getToDoList(): Promise<ToDo[]> {
        let data: ToDo[] = [];
        try {
            data = JSON.parse(await readFile(this.path, enconding));
        }
        catch(ex){
            if (ex.code !== arquivoNaoEncontrado)
                throw ex;
        }
        return data; 
    }
    
    async saveToDoList(list: ToDo[]): Promise<void> {
        await writeFile(this.path, JSON.stringify(list), enconding);
    }
}
