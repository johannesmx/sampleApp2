import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, Pressable } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DBContext } from '@/contexts/DBContext';
import { AuthContext } from '@/contexts/AuthContext';
import { DATABASE_ID, COLLECTION_ID } from '@/config/Config';
import { ID, Permission, Role, Query } from "react-native-appwrite"


export default function AddScreen() {
  const [label,setLabel] = useState<string>('')
  const [description,setDescription] = useState<string>('')
  const [validLabel,setValidLabel] = useState<boolean>(false)
  const [validDescription,setValidDescription] = useState<boolean>(false)
  const [uid,setUid] = useState<string>('')
  
  const user = useContext(AuthContext)
  const db = useContext(DBContext)

  useEffect( () => {
    if( user ) {  
      user.get()
      .then((res:any) => setUid(res.$id) ) 
      .catch((error:string) => console.log(error))
    }
  },[user])

  useEffect(() => {
    if( label.length >= 3 ) {
      setValidLabel(true)
    }
    else {
      setValidLabel(false)
    }
  },[label])

  useEffect(()=>{
    if( description.length >= 5) {
      setValidDescription(true)
    }
    else {
      setValidDescription(false)
    }
  },[description])

  

  interface Document {
    label:string,
    description: string,
    status: boolean,
    created: number,
    userId: string
  }

  const addDocument = async () => {
    const ts:number = new Date().getTime()
    const item:Document = {
      label: label,
      description: description,
      status: false,
      created: ts,
      userId: uid
    }
    console.log( item )
    // write the document to the database
    const result = await db.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      item,
      [ 
        Permission.write( Role.user(item.userId) ),
        Permission.read( Role.user(item.userId) ),
        Permission.update( Role.user(item.userId) ),
        Permission.delete( Role.user(item.userId) )
      ]
    )
  }

  return (
    <ThemedView>
      <ThemedText style={styles.screentitle}>Add a new document</ThemedText>
      <ThemedView style={styles.form}>
        <ThemedText>Item name</ThemedText>
        <TextInput 
          style={styles.input} 
          value={label}
          placeholder='minimum 3 characters'
          onChangeText={(text) => setLabel(text) }
          clearButtonMode='while-editing'
        />
        <ThemedText>Description</ThemedText>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={3}
          value={description}
          placeholder='minimum 5 characters'
          onChangeText={(text) => setDescription(text)}
        />
        <Pressable 
          style={ (validLabel&&validDescription) ? styles.button : styles.buttondisabled }
          disabled={ (validLabel&&validDescription) ? false:true}
          onPress={ () => addDocument() }
        >
          <ThemedText 
          style={ (validLabel&&validDescription) ? styles.buttonText : styles.buttonTextDisabled}
          >
            Add
            </ThemedText>
        </Pressable>
        <Pressable onPress={ () => {
          setLabel('')
          setDescription('')
        }}>
          <ThemedText style={styles.clearAll}>Clear all</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screentitle: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  form: {
    marginHorizontal: 50,
  },
  input: {
    backgroundColor: "#dfe7f5",
    padding: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#dfe7f5",
    padding: 5,
    borderRadius: 5,
  },
  buttondisabled: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#45474a",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
  },
  buttonTextDisabled: {
    textAlign: "center",
    color: "#45474a"
  },
  clearAll: {
    textAlign: "center",
    marginVertical: 5,
  }
});
