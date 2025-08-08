import { Image } from 'expo-image';
import { Platform, StyleSheet, View, FlatList } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useData } from '@/hooks/useData';
import { useUser } from '@/hooks/userContext'

export default function ListScreen() {
  const[uid,setUid] = useState<string>('')
  const[items,setItems] = useState<any[]>([])

  const data = useData()
  const user = useUser()
 
  useEffect( ()=>{
    if( user.current ) {
      setUid( user.current.$id )
      console.log( user )
    }
  },[user])

  useEffect(() => {
    console.log(data)
    if( data.current ) {
      setItems( data.current )
    }
  },[data])

  
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
