import { ToDoRepository } from '../intefaces/todo-repository';
import { ToDo } from '../entities/todo';

export class ToDoService {
    constructor(private repository: ToDoRepository) {}

    async add(title: string): Promise<ToDo> {
        const list = await this.repository.getToDoList();
        const todo: ToDo = {
            title,
            done: false            
        };
        list.push(todo);
        this.repository.saveToDoList(list);
        return todo;
    }
}