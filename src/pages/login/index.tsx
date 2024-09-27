import React, { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useFirebase } from '../../hook/useFirebase';
import { googleProvider } from '../../firebaseConfig';

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
                console.log(userCredencial.user)
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
                console.log(userCredencial.user)
                alert(`Bem vindo: ${userCredencial.user.email}`)
            })
            .catch((error) => console.error(error))
    }

    const LoginComGoogle = async () => {
        try {
            const userCredencial = await signInWithPopup(api.auth, googleProvider)
            console.log(userCredencial.user)
            alert(`Bem vindo: ${userCredencial.user.displayName !== null ? userCredencial.user.displayName : userCredencial.user.email}`)
        } catch (error) {
            console.error('ocorreu um erro ao fazer login com o google: ', error)
        }
    }

    return (
        <div>
            Login Works
            {
                api.auth.currentUser === null
                    ? estaFazendoLogin
                        ? <div>
                            <input type="text" placeholder='email' onChange={(evento) => setEmail(evento.target.value)}/>
                            <input type="password" placeholder='senha' onChange={(evento) => setSenha(evento.target.value)}/>
                            <div>
                                <button onClick={() => FazerLogin()}>Acessar</button>
                            </div>
                            <div>
                                <button onClick={() => setEstaFazendoLogin(!estaFazendoLogin)}>Fazer Cadastro</button>
                            </div>
                            <div>
                                <button onClick={() => LoginComGoogle()}>Login com Google</button>
                            </div>

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
                    : null
            }

            {
                api.auth.currentUser
                    ? <div>
                        <img src={api.auth.currentUser.photoURL || ''} alt='blablabla' />
                        <p>{api.auth.currentUser.displayName}</p>
                        <p>{api.auth.currentUser.email}</p>
                        <button onClick={() => {
                            api.auth.signOut()
                        }}>Logout</button>
                      </div>
                    : null
            }
        </div>
    )
}

export default Login
