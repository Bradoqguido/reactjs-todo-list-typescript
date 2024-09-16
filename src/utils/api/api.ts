import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { Todo } from "./models/todo";

export class Api {
    todo: Todo;

    constructor(db: Firestore, auth: Auth) {
        this.todo = new Todo(db, 'todo')
    }
}