import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, Pressable } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { router } from 'expo-router'

export default function ProfileScreen() {
    const user = useContext(AuthContext)

    const signOut = async () => {
        await user.deleteSession("current")
        router.navigate("/login")
    }

    return(
        <ThemedView>
            <ThemedText>Profile</ThemedText>
            <Pressable onPress={ () => signOut() }>
                <ThemedText>Sign out</ThemedText>
            </Pressable>
        </ThemedView>
    )
}