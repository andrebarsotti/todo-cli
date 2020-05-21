import { ToDo } from '../model/todo';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const enconding = 'utf8'
const arquivoNaoEncontrado = 'ENOENT';

export class JsonFileWriter {
    async getJson(path: string): Promise<ToDo[]> {
        let data: ToDo[] = [];
        try {
            data = JSON.parse(await readFile(path, enconding));
        }
        catch(ex){
            if (ex.code !== arquivoNaoEncontrado)
                throw ex;
        }
        return data; 
    }

    async saveJson(path: string, data: ToDo[]): Promise<void> {
        await writeFile(path, JSON.stringify(data), enconding);
    }
}
