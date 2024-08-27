import React, { useState } from 'react'
import TodoList from '../../components/todolist'
import CriarTodo from '../../components/criarTodo'
import { TodoProps } from '../../@types/todo'

const Todo = () => {
    const [getTodos, setTodos] = useState<TodoProps[]>([
        { id: 1, titulo: 'tarefa 1'},
        { id: 2, titulo: 'tarefa 2'},
        { id: 3, titulo: 'tarefa 3'},
        { id: 4, titulo: 'tarefa 4'},
        { id: 5, titulo: 'tarefa 5'}
      ])
    
      return (
        <div>
          <CriarTodo criarTodo={(novoTodo: TodoProps) => {
            const id: number  = getTodos.length + 1
            novoTodo.id = id
            const tmpTodos: TodoProps[] = [...getTodos, novoTodo]
            setTodos(tmpTodos)
          }} />
          <TodoList 
            getTodos={getTodos} 
            setTodos={(novaLista: TodoProps[]) => setTodos(novaLista)} />
        </div>
      );
}

export default Todo;

