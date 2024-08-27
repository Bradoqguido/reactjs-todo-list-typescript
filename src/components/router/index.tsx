import React, { useState } from "react";
import Todo from "../../pages/todo";

enum RouterPages {
    'home' = 'home',
    'todo' = 'todo',
    'sobre' = 'sobre'
}

const Router = () => {
    const [getPaginaAtual, setPaginaAtual] = 
        useState<RouterPages>(RouterPages.home)
    
    const renderizarBotoes = () => (
        <div>
            <button onClick={() => setPaginaAtual(RouterPages.home)}>Inicio</button>
            <button onClick={() => setPaginaAtual(RouterPages.todo)}>Todo</button>
            <button onClick={() => setPaginaAtual(RouterPages.sobre)}>Sobre</button>
        </div>
    )

    const renderizarPagina = () => {
        switch (getPaginaAtual) {
            case RouterPages.home: return <div><h1>Inicio</h1></div>
            case RouterPages.todo: return <Todo />
            case RouterPages.sobre: return <div><h1>Sobre</h1></div>
            default: return <div><h1>Inicio</h1></div>
        }
    }

    return (
        <div>
            {renderizarBotoes()}
            {renderizarPagina()}
        </div>
    )
}

export default Router;