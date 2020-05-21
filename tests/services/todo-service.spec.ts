import * as sinon from 'sinon'
import { ToDoRepository } from '../../src/intefaces/todo-repository';
import { ToDo } from '../../src/entities/todo';
import { ToDoService } from '../../src/services/todo-service';
import * as faker from 'faker';
import { assert, expect } from 'chai';


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
        const service = new ToDoService(fakeRepo);
        const todo = await service.add(title);

        //Validation
        expect(todo.title).to.be.eq(title);
        expect(list).to.contain(todo);
        assert.isTrue(getToDoListFake.calledOnce, 'respositorio.getToDoList() deve ser chamado uma vez.');
        assert.isTrue(saveToDoListFake.calledOnceWith(list), 'repositorio.saveToDoList(list) deve ser chamado uma vez.');
    });
});