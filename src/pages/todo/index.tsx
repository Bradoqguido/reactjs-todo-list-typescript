import React, { useState } from 'react'
import TodoList from '../../components/todolist'
import CriarTodo from '../../components/criarTodo'
import { TodoProps } from '../../@types/todo'

enum TodoPages {
  'criarTodo' = 'criarTodo',
  'listarTodo' = 'listarTodo'
}

const Todo = () => {
    const [getTodos, setTodos] = useState<TodoProps[]>([
      { id: 1, titulo: 'tarefa 1'},
      { id: 2, titulo: 'tarefa 2'},
      { id: 3, titulo: 'tarefa 3'},
      { id: 4, titulo: 'tarefa 4'},
      { id: 5, titulo: 'tarefa 5'}
    ])
    
    const [getPaginaAtual, setPaginaAtual] = useState<TodoPages>(TodoPages.listarTodo);

    const renderizarPagina = () => {
      switch (getPaginaAtual) {
        case TodoPages.criarTodo:
          return (
            <CriarTodo criarTodo={(novoTodo: TodoProps) => {
              const id: number  = getTodos.length + 1
              novoTodo.id = id
              const tmpTodos: TodoProps[] = [...getTodos, novoTodo]
              setTodos(tmpTodos)
              // setPaginaAtual(TodoPages.listarTodo)
            }} />
          )
        case TodoPages.listarTodo:
          return (
            <TodoList
              getTodos={getTodos} 
              setTodos={(novaLista: TodoProps[]) => setTodos(novaLista)} />
          )
        default:
          return (
            <TodoList
              getTodos={getTodos} 
              setTodos={(novaLista: TodoProps[]) => setTodos(novaLista)} />
          )
      }
    }

    const renderizarBotoes = () => (
      <div>
        <button onClick={() => setPaginaAtual(TodoPages.listarTodo)}>Lista de tarefas</button>
        <button onClick={() => setPaginaAtual(TodoPages.criarTodo)}>Criar tarefa</button>
      </div>
    )

    return (
      <div style={{ textAlign: 'center' }}>
        {renderizarBotoes()}
        {renderizarPagina()}
      </div>
    );
}

export default Todo;

