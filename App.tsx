import React from 'react';
import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './src/api/SupabaseClient';
import Auth from './components/Auth';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TaskContextProvider from './src/contexts/TaskContextProvider';
import NoteContextProvider from './src/contexts/NoteContextProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DailyScreen from './screens/DailyScreen';
import PlanningScreen from './screens/PlanningScreen';
import ReviewScreen from './screens/ReviewScreen';
import WeeklyScreen from './screens/WeeklyScreen';
import ScopeDayScreen from './screens/ScopeDayScreen';


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

  const Stack = createStackNavigator();

  function DailyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Daily Screen" options={{ headerShown: false }} component={DailyScreen} />
        <Stack.Screen name="ScopeDay" options={{ title: '' }} component={ScopeDayScreen} />
      </Stack.Navigator>
    );
  }

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
        <Tab.Screen name="Do" component={DailyStack} />
        <Tab.Screen name="Plan" component={WeeklyScreen} />
        <Tab.Screen name="Review" component={ReviewScreen} />
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
