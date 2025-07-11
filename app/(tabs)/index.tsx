import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DBContext } from '@/contexts/DBContext';
import { AuthContext } from '@/contexts/AuthContext';
import { DATABASE_ID, COLLECTION_ID } from '@/config/Config';
import { ID, Permission, Role, Query } from "react-native-appwrite"

export default function HomeScreen() {
  const user = useContext( AuthContext )
  const db = useContext( DBContext )

  interface Document {
    label:string,
    description: string,
    status: boolean,
    created: number,
    userId: string
  }

  useEffect( () => {
    if( user ) {
      user.get().then( (res:any) => console.log(res) )
    }
  }, [user])

  const addData = async ( doc:Document ) => {
    const result = await db.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      doc,
      [ 
        Permission.write( Role.user(doc.userId) ),
        Permission.read( Role.user(doc.userId) )
      ]
    )
  }

  return (
    <View>
      <ThemedView>
        <ThemedText>Home</ThemedText>
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
