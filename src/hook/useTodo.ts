import React, { useContext } from "react";
import { TodoService } from "../utils/TodoService";
import { ContextTodo } from "../context/contextTodo";

export const useTodo = (): TodoService => {
    const context: { todoService: TodoService } | undefined = useContext(ContextTodo)

    if (!context) { // verifica se o contexto é inválido (undefined)
        throw new Error('O hook useTodo só pode ser utilizado dentro do contexto TodoContext.')
    }

    return context.todoService
}
