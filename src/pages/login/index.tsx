import React, { useState } from 'react'
import { useFirebase } from '../../hook/useFirebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
    const api = useFirebase()
    const [estaFazendoLogin, setEstaFazendoLogin] = useState(true)
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [confirmarSenha, setConfirmarSenha] = useState<string>('')

    const fazerLogin = () => {
        if (email.length <= 0) return
        if (senha.length <= 0) return

        signInWithEmailAndPassword(api.auth, email, senha)
            .then((userCredencial) => {
                console.log('Credenciais do usuário: ',{userCredencial})
            })
            .catch((error) => console.error('erro ao fazer login. ', error))
    }

    const registrarUsuario = () => {
        if (email.length <= 0) return
        if (senha.length <= 0 && senha !== confirmarSenha) return

        createUserWithEmailAndPassword(api.auth, email, senha)
            .then((userCredencial) => {
                console.log('Credenciais do usuário: ',{userCredencial})
            })
            .catch((error) => console.error('erro ao fazer login. ', error))
    }

    return (
        <div>
            {
                estaFazendoLogin
                    ? <div>
                        <h1>Login</h1>
                        <input placeholder='email' type='email' onChange={(evento) => setEmail(evento.target.value)}/>
                        <input placeholder='senha' type='password' onChange={(evento) => setSenha(evento.target.value)}/>
                        <div>
                            <button onClick={() => fazerLogin()}>Fazer Login</button>
                        </div>
                        <button onClick={() => setEstaFazendoLogin(false)}>Criar Conta</button>
                      </div>
                    : <div>
                        <h1>Criar Conta</h1>
                        <div>
                            <input placeholder='email' type='email' onChange={(evento) => setEmail(evento.target.value)} />
                            <input placeholder='senha' type='password' onChange={(evento) => setSenha(evento.target.value)} />
                            <input placeholder='confirmar senha' type='password' onChange={(evento) => setConfirmarSenha(evento.target.value)} />
                        </div>
                        <div>
                            <button onClick={() => registrarUsuario()}>Criar Conta</button>
                        </div>
                        <button onClick={() => setEstaFazendoLogin(true)}>Fazer Login</button>
                      </div>
            }

            <button onClick={() => api.auth.signOut()}>Logout</button>
        </div>
    )
}

export default Login;
