import { TodoProps } from "../@types/todo";

export class TodoService {
    private todos: TodoProps[] = []

    public get(): TodoProps[] {
        return this.todos
    }

    public set(newTodos: TodoProps[]): void {
        this.todos = newTodos
    }
}
