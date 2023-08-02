import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-url-polyfill/auto';
import { supabase } from './src/api/SupabaseClient';
import Auth from './components/Auth';
import { Session } from '@supabase/supabase-js';
import TaskContextProvider from './src/contexts/TaskContextProvider';
import NoteContextProvider from './src/contexts/NoteContextProvider';
import DailyScreen from './screens/DailyScreen';
import QuarterlyScreen from './screens/QuarterlyScreen';
import WeeklyScreen from './screens/WeeklyScreen'


export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const Tab = createBottomTabNavigator();
 
  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingVertical: 10,
          },
        }}
      >
        <Tab.Screen name="Day" component={DailyScreen}/>
        <Tab.Screen name="Week" component={WeeklyScreen}/>
        <Tab.Screen name="Quarter" component={QuarterlyScreen}/>
      </Tab.Navigator>
    );
  }

  return (
    <TaskContextProvider>
      <NoteContextProvider>
        <SafeAreaView style={styles.container}>
          <GestureHandlerRootView style={{flex: 1}}>
          <View style={styles.container}>
            {session && session.user ?  
              <NavigationContainer>
                <MyTabs />
              </NavigationContainer> : 
              <Auth />}
            </View>
          </GestureHandlerRootView>
        </SafeAreaView>
      </NoteContextProvider>
    </TaskContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
