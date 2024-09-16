import { createContext } from 'react'
import { Api } from '../utils/api/api'

export const FirebaseContext = createContext<{ api: Api } | undefined>(undefined)