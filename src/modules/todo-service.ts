import { ToDo } from '../entities/todo';

export interface ToDoService {
    add(title: string, done: boolean): Promise<ToDo>;
    markAsDone(id: number): Promise<void>;
}