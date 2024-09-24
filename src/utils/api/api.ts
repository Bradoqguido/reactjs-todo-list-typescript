import { Firestore } from "firebase/firestore";
import { Auth } from "firebase/auth";
import { Todo } from "./models/todo";

export class Api {
    auth: Auth;
    todo: Todo;

    constructor(db: Firestore, auth: Auth) {
        this.todo = new Todo(db, 'todo')
        this.auth = auth
    }
}