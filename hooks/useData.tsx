import { COLLECTION_ID, DATABASE_ID } from "@/config/Config"
import { Document } from "@/interfaces/Document"
import { databases } from "@/lib/appwrite"
import { createContext, useContext, useEffect, useState } from "react"
import { ID, Permission, Query, Role } from "react-native-appwrite"

const DataContext = createContext <null|any>(null)

export function useData() {
    return useContext(DataContext)
}

export function DataProvider( props: any ) {
    const [items,setItems] = useState <any[]> ([])

    async function add(doc:Document) {
        const response = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            doc,
            [Permission.write(Role.user(doc.userId))]
        )
    }

    async function init() {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc("created")]
        )
        setItems( response.documents )
    }

    async function remove(id:any) {
        await databases.deleteDocument(
            DATABASE_ID,
            COLLECTION_ID,
            id
        )
        setItems( 
            (items) => items.filter((item) => item.$id !== id ) 
        )
    }

    useEffect( () => {
        init()
    },[])

    return (
        <DataContext.Provider value={{ current: items, add, remove }}>
            { props.children }
        </DataContext.Provider>
    )
}
