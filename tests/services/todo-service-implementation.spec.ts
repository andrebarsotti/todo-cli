import sinon from 'sinon'
import faker from 'faker';
import { assert, expect } from 'chai';
import { ToDoRepository } from '../../src/services/todo-repository';
import { ToDo } from '../../src/entities/todo';
import { ToDoServiceImplementation } from '../../src/services/todo-service-implementation';

describe('Dado que o usuário informa um To Do', () => {
    it('Então esse todo deve ser adicionado', async () => {
        //Setup
        const list: ToDo[] = [];
        const getToDoListFake = sinon.fake.resolves(list);
        const saveToDoListFake = sinon.fake();
        const fakeRepo: ToDoRepository = {
           getToDoList: getToDoListFake,
           saveToDoList:  saveToDoListFake 
        };
        const title = faker.lorem.sentence(5);
        
        //Execute
        const service = new ToDoServiceImplementation(fakeRepo);
        const todo = await service.add(title);

        //Validation
        expect(todo.title).to.be.eq(title);
        expect(list).to.contain(todo);
        assert.isTrue(getToDoListFake.calledOnce, 'respositorio.getToDoList() deve ser chamado uma vez.');
        assert.isTrue(saveToDoListFake.calledOnceWith(list), 'repositorio.saveToDoList(list) deve ser chamado uma vez.');
    });
    it('e a tarefa já vem marcada como concluída Então salva a tarefa já conculída.', async () => {
        //Setup
        const list: ToDo[] = [];
        const getToDoListFake = sinon.fake.resolves(list);
        const saveToDoListFake = sinon.fake();
        const fakeRepo: ToDoRepository = {
           getToDoList: getToDoListFake,
           saveToDoList:  saveToDoListFake 
        };
        const title = faker.lorem.sentence(5);
        
        //Execute
        const service = new ToDoServiceImplementation(fakeRepo);
        const todo = await service.add(title, true);
    
        //Validation
        expect(todo.title).to.be.eq(title);
        expect(todo.done).to.be.true;
        expect(list).to.contain(todo);
        assert.isTrue(getToDoListFake.calledOnce, 'respositorio.getToDoList() deve ser chamado uma vez.');
        assert.isTrue(saveToDoListFake.calledOnceWith(list), 'repositorio.saveToDoList(list) deve ser chamado uma vez.');
    });
});

describe('Dado que o usuário concluíu uma tarefa', () => {
    it('Então marca a tarefa como concluída', async () => {
        //Setup
        const list: ToDo[] = [
            {
                title: faker.lorem.sentence(5),
                done: faker.random.boolean()
            },
            {
                title: faker.lorem.sentence(5),
                done: false
            },
            {
                title: faker.lorem.sentence(5),
                done: faker.random.boolean()
            },          
        ];
        const getToDoListFake = sinon.fake.resolves(list);
        const saveToDoListFake = sinon.fake();
        const fakeRepo: ToDoRepository = {
           getToDoList: getToDoListFake,
           saveToDoList:  saveToDoListFake 
        };
        
        //Execute
        const service = new ToDoServiceImplementation(fakeRepo);
        await service.markAsDone(1);

        //Validation
        expect(list[1].done).to.be.true;
        assert.isTrue(getToDoListFake.calledOnce, 'respositorio.getToDoList() deve ser chamado uma vez.');
        assert.isTrue(saveToDoListFake.calledOnceWith(list), 'repositorio.saveToDoList(list) deve ser chamado uma vez.');
    });
});