import { ToDo } from '../model/todo';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export class JsonFileWriter {
    async getJson(path: string): Promise<ToDo[]> {
        let data: ToDo[] = [];
        try {
            data = JSON.parse(await readFile(path, 'utf8'));
        }
        catch(ex){
            if (ex.code !== 'ENOENT')
                throw ex;
        }
        return data; 
    }

    async saveJson(path: string, data: ToDo[]): Promise<void> {
        await writeFile(path, JSON.stringify(data));
    }
}
