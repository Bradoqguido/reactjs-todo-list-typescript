import { collection, addDoc, setDoc, getDocs, doc, deleteDoc, updateDoc, onSnapshot, query, Firestore, getDoc, where } from "firebase/firestore";

export default class Crud<T> {
    protected collectionRef;

    constructor(db: Firestore , collectionName: string) {
        this.collectionRef = collection(db, collectionName)
    }

    protected doErrorCheck = (data: T[] | null, error: any | null): void => {
        if (data === null || error !== null) throw error;
    }

    async insert(objeto: any): Promise<void> {
        try {
            const docRef = doc(this.collectionRef, objeto.id)
            await setDoc(docRef, objeto, { merge: true })
        } catch (error: any) {
            console.error('Erro ocorreu ao inserir registro. ', {error})
        }
    }

    async selectAll(): Promise<T[]> {
        try {
            const dados: T[] = []
            const q = query(this.collectionRef)
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                dados.push({
                    id: doc.id,
                    ...doc.data() as T
                })
            })
            return dados
        } catch (error) {
            console.error('Erro ao buscar todos os registros. ', {error})
            return []
        }
    }

    async select(id: string): Promise<T | undefined> {
        try {
            const docRef = doc(this.collectionRef, id)
            const docSnapshot = await getDoc(docRef)
            if (docSnapshot.exists()) {
                const item: any = docSnapshot.data() as T
                item.id = docSnapshot.id
                return item
            }
        } catch (error: any) {
            console.error('Erro ocorreu ao buscar um registro. ', {error})
            return undefined
        }
    }

    async update(objeto: any): Promise<void> {
        try {
            const docRef = doc(this.collectionRef, objeto.id)
            await updateDoc(docRef, objeto)
        } catch (error: any) {
            console.error('Erro ocorreu ao atualizar um registro. ', {error})
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const docRef = doc(this.collectionRef, id)
            await deleteDoc(docRef)
        } catch (error: any) {
            console.error('Erro ocorreu ao deletar um registro. ', {error})
        }
    }
}