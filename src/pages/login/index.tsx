import React, { useState } from 'react'
import { useFirebase } from '../../hook/useFirebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth'
import { googleAuthProvider } from '../../firebaseConfig'

const Login = () => {
    const api = useFirebase()
    const [user, setUser] = useState<User | null>(api.auth.currentUser)
    const [estaFazendoLogin, setEstaFazendoLogin] = useState(true)
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [confirmarSenha, setConfirmarSenha] = useState<string>('')

    const fazerLogin = () => {
        if (email.length <= 0) return
        if (senha.length <= 0) return

        signInWithEmailAndPassword(api.auth, email, senha)
            .then((userCredencial) => {
                setUser(userCredencial.user)
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

    const fazerLoginComGoogle = () => {
        signInWithPopup(api.auth, googleAuthProvider)
            .then((userCredential) => { 
                setUser(userCredential.user)
            })
            .catch((error) => {
                console.error('erro ao fazer login com google.',error)
            })
    }

    return (
        <div>
            {
                user
                    ? <div>
                        <p>Bem vindo, {user.displayName ? user.displayName : user.email}!</p>
                        <p>UID: {user.uid}</p>
                        <p>Email: {user.email}</p>
                        <button onClick={() => {
                            api.auth.signOut().then(() => setUser(api.auth.currentUser))
                        }}>Logout</button>
                      </div>
                    : estaFazendoLogin
                                ? <div>
                                    <h1>Login</h1>
                                <input placeholder='email' type='email' onChange={(evento) => setEmail(evento.target.value)}/>
                                <input placeholder='senha' type='password' onChange={(evento) => setSenha(evento.target.value)}/>
                                    <div>
                                        <button onClick={() => fazerLogin()}>Fazer Login</button>
                                    </div>
                                    <div>
                                        <button onClick={() => fazerLoginComGoogle()}>Fazer Login com Google</button>
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
        </div>
    )
}

export default Login;