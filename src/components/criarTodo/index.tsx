import React, { useEffect, useState } from "react";
import { TodoProps } from "../../@types/todo";
import "./styles.css";

type CriarTodoProps = {
  criarTodo: (todo: TodoProps) => void;
};

const CriarTodo = ({ criarTodo }: CriarTodoProps) => {
  const [getTodo, setTodo] = useState<TodoProps>({ id: 0, titulo: "" });

  useEffect(() => {}, [getTodo]);

  return (
    <div>
      <h1>Crie sua tarefa</h1>
      <div>
        <input
          placeholder="Digite o nome da tarefa"
          onChange={(evento) =>
            setTodo({ ...getTodo, 
                titulo: evento.target.value })
          }
        />
        <button onClick={() => 
            criarTodo(getTodo)}>Criar tarefa
        </button>
      </div>
    </div>
  );
};

export default CriarTodo;
