import React, { useEffect } from 'react'
import './styles.css'
import { TodoProps } from '../../@types/todo'

type TodoListProps = {
    getTodos: TodoProps[]
    setTodos: (todos: TodoProps[]) => void
}

const TodoList = ({ getTodos, setTodos }: TodoListProps) => {
    useEffect(() => {}, [getTodos])

    const finalizaTodo = (id: number) => {
        const tmpTodos: TodoProps[] = getTodos.filter(
            (todo: TodoProps) => todo.id !== id)
        setTodos(tmpTodos)
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <ul>
                {
                    getTodos.map((todo: TodoProps) => (
                        <li key={todo.id}>
                            <input type='checkbox' onClick={() => finalizaTodo(todo.id)} /> {todo.titulo}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoList;