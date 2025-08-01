import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { useState, useEffect, useContext } from 'react'
import { ValidIndicator } from '@/components/ui/ValidIndicator'
import { useUser } from '@/hooks/userContext'
import { router, Link } from 'expo-router'
//import { AuthContext } from '@/contexts/AuthContext'
//import { ID } from 'react-native-appwrite'

export default function Login(props: any) {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // email and password validity
    const [validEmail, setValidEmail] = useState<boolean>(false)
    const [validPassword, setValidPassword] = useState<boolean>(false)
    const [auth,setAuth] = useState<boolean>(false)

    //const user = useContext(AuthContext)
    const user = useUser()

    const login = async () => {
        try {
            // const session = await user.createEmailPasswordSession(email,password)
            // console.log(session)
            // setAuth(session)
            await user.login( email, password )
            setAuth( true )
        }
        catch( error:any ) {
            console.log( error )
        }
    }

    useEffect(() => {
        if( auth ) {
            router.navigate("/(tabs)")
        }
    }, [auth])

    
    useEffect(() => {
        if (email.indexOf('@') > 0) {
            // console.log('valid email')
            setValidEmail(true)
        }
        else {
            // console.log('invalid email')
            setValidEmail(false)
        }
    }, [email])

    useEffect(() => {
        if (password.length >= 8) {
            // valid password
            setValidPassword(true)
        }
        else {
            // invalid password
            setValidPassword(false)
        }
    }, [password])

    return (
        <ThemedView style={styles.container}>
            <View style={styles.form}>
                <ThemedText style={styles.title}>Sign in</ThemedText>
                <View style={ styles.label }>
                    <ThemedText>Email</ThemedText>
                    <ValidIndicator valid={validEmail} />
                </View>
                
                <TextInput
                    style={styles.input}
                    placeholder='you@example.com'
                    onChangeText={(val) => setEmail(val)}
                    value={email}
                />

                <View style={ styles.label }>
                    <ThemedText>Password</ThemedText>
                    <ValidIndicator valid={validPassword} />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='minimum 8 characters'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />

                <Pressable
                    style={(validEmail && validPassword) ? styles.button : styles.buttondisabled}
                    disabled={(validEmail && validPassword) ? false : true}
                    onPress={ () => { 
                        login()
                        }}
                >
                    <ThemedText
                        style={(validEmail && validPassword) ? styles.buttonText : styles.buttonTextDisabled}
                    >
                        Sign In
                    </ThemedText>
                </Pressable>
                <ThemedText style={ styles.altscreen }>
                    <Link href="/">Don't have an account? Go to Sign up</Link>
                </ThemedText>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 50,
        padding: 15,
        marginTop: 100,
    },
    input: {
        backgroundColor: "#dfe7f5",
        padding: 5,
        fontSize: 16,
        marginBottom: 15,
    },
    title: {
        fontSize: 32,
        textAlign: "center",
    },
    container: {
        flex: 1,

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
    label: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
     altscreen: {
        marginTop: 20,
        textAlign: "center",
    },
})