import {db, auth} from '../firebaseConfig'
import { Firestore } from 'firebase/firestore'
import { Auth } from 'firebase/auth'
import { createContext } from 'react'

interface FirebaseContextProps {
    db: Firestore,
    auth: Auth
}

export const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined)