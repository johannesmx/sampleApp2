import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
//import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// import { DBContext } from '@/contexts/DBContext';
// import { databases } from '@/lib/appwrite';
import { useData } from '@/hooks/useData'
import { DataProvider } from '@/hooks/useData'

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const data = useData()
  return (
    // <DBContext.Provider value={databases}>
    <DataProvider value={data}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="list-outline" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Add',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="add-circle-outline" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <Ionicons size={28} name="person-circle" color={color} />
          }}
        />
      </Tabs>
      </DataProvider>
    // </DBContext.Provider>
  );
}
