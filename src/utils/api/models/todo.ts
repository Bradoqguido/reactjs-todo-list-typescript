import Crud from "./crud";
import { TodoProps } from "../../../@types/todo";
import { Firestore } from "firebase/firestore";

export class Todo extends Crud<TodoProps> {
    constructor (db: Firestore ,collection: string) {
        super(db, collection);
    }
}