import React, { useEffect, useState } from "react";
import { useFirebase } from "../../hook/useFirebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { googleAuthProvider } from "../../firebaseConfig";

const Login = () => {
    const api = useFirebase()
    const [estaFazendoLogin, setEstaFazendoLogin] = useState(true)
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')

    const [user, setUser] = useState<User | null>(api.auth.currentUser)

    useEffect(() => {
        const authStateUnsubscribe = onAuthStateChanged(api.auth, (currentUser) => setUser(currentUser))
        return () => authStateUnsubscribe()
    }, [])

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

    const entrarComGoogle = async () => {
        try {
            await signInWithPopup(api.auth, googleAuthProvider)
        } catch (error) {
            console.error('Erro ao fazer login: ', error)
        }
    }

    return (
        <div>
            { 
                user 
                    ? <div>
                        <p>Bem vindo: {user.displayName ? user.displayName : user.email}</p>
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                        <button onClick={() => api.auth.signOut()}>Sair</button>
                      </div>
                    : estaFazendoLogin
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
                            <div>
                                <button onClick={() => fazerLoginComEmailESenha()}>Fazer login</button>
                            </div>
                            <button onClick={() => entrarComGoogle()}>Entrar com Google</button>
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
        </div>
    )
}

export default Login;