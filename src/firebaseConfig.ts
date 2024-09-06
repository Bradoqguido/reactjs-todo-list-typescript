import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import config from './firebaseConfig.json'

const firebaseConfig = config.firebaseConfig;

// inicializa o firebase
const app = initializeApp(firebaseConfig)

// inicializar firestore e auth
export const db = getFirestore(app)
export const auth = getAuth(app)