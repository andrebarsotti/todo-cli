import { ToDo } from '../entities/todo';

export interface ToDoRepository {
    getToDoList(): Promise<ToDo[]>;
    saveToDoList(list: ToDo[]): Promise<void>;
}
