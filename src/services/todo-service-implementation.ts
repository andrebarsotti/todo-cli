import { ToDoRepository } from './todo-repository';
import { ToDo } from '../entities/todo';
import { ToDoService } from '../modules/todo-service';

export class ToDoServiceImplementation implements ToDoService {
    constructor(private repository: ToDoRepository) {}
    
    async add(title: string, done = false): Promise<ToDo> {
        const list = await this.repository.getToDoList();
        const todo: ToDo = {
            title,
            done           
        };
        list.push(todo);
        this.repository.saveToDoList(list);
        return todo;
    }

    async markAsDone(id: number): Promise<void> {
        const lista = await this.repository.getToDoList();
        lista[id].done = true
        this.repository.saveToDoList(lista);
    }
}
