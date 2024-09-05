import React, { createContext } from 'react'
import { TodoProps } from '../@types/todo'

export const ContextoTodo = createContext<TodoProps[]>([])