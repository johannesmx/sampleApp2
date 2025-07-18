import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DBContext } from '@/contexts/DBContext';
import { AuthContext } from '@/contexts/AuthContext';
import { DATABASE_ID, COLLECTION_ID } from '@/config/Config';
import { ID, Permission, Role, Query } from "react-native-appwrite"

export default function ListScreen() {
  const[uid,setUid] = useState<string>('')
  const[items,setItems] = useState<any[]>([])

  const user = useContext( AuthContext )
  const db = useContext( DBContext )

  useEffect( ()=>{
    if( user ) {
      user.get().then(
        (res:any) => setUid( res.$id )
      )
    }
  },[user])

  const listData = async () => {
    const response = await db.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("userId", [uid]),Query.orderDesc("created") ]
    )
    setItems( response )
    console.log(items, response )
  }

  useEffect(()=>{
    listData()
  },[])

  return (
    <View>
      <ThemedView>
        <ThemedText>List View</ThemedText>
        <FlatList 
          data={ items }
          renderItem={ ({item}) => <ThemedText>{ item.label }</ThemedText>}
          keyExtractor={ item => item.$id }
        />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
