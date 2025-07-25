import { Client, Databases, Account } from "react-native-appwrite";
import { 
    EXPO_PUBLIC_APPWRITE_ENDPOINT, 
    EXPO_PUBLIC_APPWRITE_PROJECT_ID 
} from "@/config/Config";

const client = new Client();
client
  .setEndpoint(EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(EXPO_PUBLIC_APPWRITE_PROJECT_ID) // Replace with your project ID
  .setPlatform('au.edu.ait.testapp');


export const account = new Account(client);
export const databases = new Databases(client);
