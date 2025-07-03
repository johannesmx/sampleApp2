import { ID } from "react-native-appwrite";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { type Models } from "react-native-appwrite";

const UserContext = createContext<null | any>(null)

export function useUser() {
  return useContext(UserContext);
}

interface uProvider extends React.PropsWithChildren{
    current: {
      user: any
      register: (email:string, password:string) => Promise<void>
      logout: () => Promise<void>
      login: (email: string, password:string) => Promise<void>
    }
}

export function UserProvider(props:any) {
  const [user, setUser] = useState< null|any>(null);

  async function login(email:string, password:string) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
    
  }

  async function register(email:string, password:string) {
    await account.create(ID.unique(), email, password);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  )
}
