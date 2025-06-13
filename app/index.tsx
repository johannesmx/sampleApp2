import {View,Text,StyleSheet} from 'react-native'
import { Link } from 'expo-router'

export default function SignUp(props:any) {
    return(
        <View style={styles.container}>
            <Text style={styles.title} >Sign up</Text>
            <Link href={"/(tabs)"}>
                <Text>Go to Home</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        color: "green",
        textAlign: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center"
    }
})