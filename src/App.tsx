import React from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Todo from "./pages/todo";
import Home from "./pages/home";
import Sobre from "./pages/sobre";
import { ContextoTema } from "./context/contextTema";
import { ContextoTodo } from "./context/contextTodo";
import { FirebaseContext } from './context/contextFirebase';
import { db, auth } from './firebaseConfig'

function App() {
  const renderizarBotoes = () => (
    <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/todo">Todo</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
          </ul>
        </nav>
      </div>
  );

  return (
    <ContextoTema.Provider value='dark'>
      <FirebaseContext.Provider value={{ db, auth }}>
        <Router>
          {renderizarBotoes()}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={
              <ContextoTodo.Provider value={[]}>
                <Todo />
              </ContextoTodo.Provider>
            } />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </Router>
      </FirebaseContext.Provider>
    </ContextoTema.Provider>
  );
}

export default App;
