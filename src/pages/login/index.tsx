import React, { useEffect, useState } from "react";
import { useFirebase } from "../../hook/useFirebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const api = useFirebase()
    const [estaFazendoLogin, setEstaFazendoLogin] = useState(true)
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')

    useEffect(() => {}, [email, senha])

    const criarContaComEmailESenha = () => {
        // faz login automaticamente após criar a conta
        createUserWithEmailAndPassword(api.auth, email, senha)
            .then((userCredential) => {
                console.log('Credenciais do usuário: ', JSON.stringify(userCredential))
            })
            .catch((error) => console.error(error))
    }

    const fazerLoginComEmailESenha = () => {
        // faz login manualmente
        signInWithEmailAndPassword(api.auth, email, senha)
            .then((userCredential) => {
                console.log('Credenciais do usuário: ', JSON.stringify(userCredential))
            })
            .catch((error) => console.error(error))
    }

    return (
        <div>
            { estaFazendoLogin 
                ? <div>
                    <h1>Login</h1>
                    <div>
                        <input type="text" 
                            placeholder="email" 
                            onChange={(evento) => setEmail(evento.target.value)} />
                        <input type="password" 
                            placeholder="senha" 
                            onChange={(evento) => setSenha(evento.target.value)}/>
                    </div>
                    <button onClick={() => fazerLoginComEmailESenha()}>Fazer login</button>
                    <div>
                        <button onClick={() => setEstaFazendoLogin(false)}>
                            Criar conta
                        </button>
                    </div>
                </div> 
                : <div>
                    <h1>Registrar</h1>
                    <div>
                        <input type="text" 
                            placeholder="email" 
                            onChange={(evento) => setEmail(evento.target.value)} />
                    </div>
                    <div>
                        <input type="password" 
                            placeholder="senha" 
                            onChange={(evento) => setSenha(evento.target.value)}/>
                    </div>
                    <button onClick={() => criarContaComEmailESenha()}>Registrar e Entrar</button>
                    <div>
                        <button onClick={() => setEstaFazendoLogin(true)}>
                            Já possuo conta
                        </button>
                    </div>
                </div>
            }

            <button onClick={() => api.auth.signOut()}>Sair</button>
        </div>
    )
}

export default Login;