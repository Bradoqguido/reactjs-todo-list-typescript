import React, { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebase } from '../../hook/useFirebase';

const Login = () => {
    const api = useFirebase()
    const [estaFazendoLogin, setEstaFazendoLogin] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [confirmarSenha, setConfirmarSenha] = useState<string>('')

    const FazerLogin = () => {
        if (email.length <= 0) {
            alert('Digite um email')
            return
        }

        if (senha.length <= 0) {
            alert('Digite sua senha')
            return
        }

        signInWithEmailAndPassword(api.auth, email, senha)
            .then((userCredencial) => {
                console.log({userCredencial})
                alert(`Bem vindo: ${userCredencial.user.email}`)
            })
            .catch((error) => console.error(error))
    }
    
    const CriarConta = () => {
        if (email.length <= 0) {
            alert('Digite um email')
            return
        }

        if (senha.length <= 0) {
            alert('Digite sua senha')
            return
        }

        if (senha !== confirmarSenha) {
            alert('Senhas não coencidem')
            return
        }

        createUserWithEmailAndPassword(api.auth, email, senha)
            .then((userCredencial) => {
                console.log({userCredencial})
                alert(`Bem vindo: ${userCredencial.user.email}`)
            })
            .catch((error) => console.error(error))
    }

    return (
        <div>
            Login Works

            {
                estaFazendoLogin
                    ? <div>
                        <input type="text" placeholder='email' onChange={(evento) => setEmail(evento.target.value)}/>
                        <input type="password" placeholder='senha' onChange={(evento) => setSenha(evento.target.value)}/>
                        <div>
                            <button onClick={() => FazerLogin()}>Acessar</button>
                        </div>
                        <button onClick={() => setEstaFazendoLogin(!estaFazendoLogin)}>Fazer Cadastro</button>
                      </div>
                    : <div>
                        <input type="text" placeholder='email' onChange={(evento) => setEmail(evento.target.value)}/>
                        <div>
                            <input type="password" placeholder='senha' onChange={(evento) => setSenha(evento.target.value)}/>
                            <input type="password" placeholder='confirmar senha' onChange={(evento) => setConfirmarSenha(evento.target.value)}/>
                        </div>
                        <div>
                            <button onClick={() => CriarConta()}>Criar Conta</button>
                        </div>
                        <button onClick={() => setEstaFazendoLogin(!estaFazendoLogin)}>Fazer Login</button>
                      </div>
            }

            <button onClick={() => api.auth.signOut()}>Logout</button>
        </div>
    )
}

export default Login
