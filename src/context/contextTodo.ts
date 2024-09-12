import React, {createContext } from "react";
import { TodoService } from "../utils/TodoService";

export const ContextTodo = createContext<{ todoService: TodoService } | undefined>(undefined)
