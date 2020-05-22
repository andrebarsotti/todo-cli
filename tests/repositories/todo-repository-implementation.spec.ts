import * as chai from 'chai';
import * as faker from 'faker';
import { ToDo } from '../../src/entities/todo';
import * as path from 'path';
import * as fs from 'fs';
import { after } from 'mocha';
import { ToDoRepositoryImplementation } from '../../src/repositories/todo-repository-implementation';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const deleteFile = promisify(fs.unlink);

function generateFakeData(): ToDo[] {
    const data = new Array<ToDo>();
    for (let i = 0; i < 10; i++) {
        data.push({
            title: faker.lorem.sentence(5),
            done: faker.random.boolean()
        });
    }
    return data;
}

const filePath = path.join(__dirname,
    faker.system.commonFileName('json'));

describe("Dado que existe um arquivo com a Lista de To-Do's.", () => {
    const data = generateFakeData();
    before(async () => {
        await writeFile(filePath, JSON.stringify(data));
    });
    it("Então retornar os ToDos em uma lista.", async () => {
        const writer = new ToDoRepositoryImplementation(filePath);
        const resultado = await writer.getToDoList();
        chai.expect(JSON.stringify(resultado)).to.be.eq(JSON.stringify(data));
    });
    after(async () => {
        await deleteFile(filePath);
    })
});

describe("Dado que não existe um arquivo com a Lista de tarefas.", () => {
    it("Então retornar a lista vazia", async () => {
        const writer = new ToDoRepositoryImplementation(filePath);
        const resultado = await writer.getToDoList();
        chai.expect(resultado).to.be.empty;
    });
});

describe("Dado que modificou-se a lista de tarefas", () => {   
    it("Então salvar o arquivo", async () => {
        //Setup
        const todoList = generateFakeData();
        const writer = new ToDoRepositoryImplementation(filePath);

        //Execute
        await writer.saveToDoList(todoList);

        //Validate
        const data = await readFile(filePath, 'utf8');
        chai.expect(JSON.stringify(todoList)).to.be.eq(data);
    });

    after(async () => await deleteFile(filePath));
});
