import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DBContext } from '@/contexts/DBContext';
import { AuthContext } from '@/contexts/AuthContext';
// import { DATABASE_ID, COLLECTION_ID } from '@/config/Config';
// import { ID, Permission, Role, Query } from "react-native-appwrite"
import { useData } from '@/hooks/useData';

export default function ListScreen() {
  const[uid,setUid] = useState<string>('')
  const[items,setItems] = useState<any[]>([])

  const user = useContext( AuthContext )
  const data = useData()
  const db = useContext( DBContext )

  useEffect( ()=>{
    if( user ) {
      user.get().then(
        (res:any) => setUid( res.$id )
      )
      .catch((error:string) => console.log(error))
    }
  },[user])

  
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
