import React, { useState, useEffect, ComponentType } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-url-polyfill/auto';
import { supabase } from './src/api/SupabaseClient';
import Auth from './components/Auth';
import { Session } from '@supabase/supabase-js';
import TaskContextProvider from './src/contexts/TaskContextProvider';
import NoteContextProvider from './src/contexts/NoteContextProvider';
import DailyScreen from './screens/DailyScreen';
import ReviewDayScreen from './screens/ReviewDayScreen';
import ReviewWeekScreen from './screens/ReviewWeekScreen';
import ReviewQuarterScreen from './screens/ReviewQuarterScren';
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
  const DailyStack = createStackNavigator(); // 2. create a Stack navigator
  
  // 3. Use the Stack navigator as a screen for the Tab
  function DailyStackScreen() {
    return (
      <DailyStack.Navigator
        screenOptions={{
          headerBackTitle: 'Today',
          headerTintColor: '#767577',
      }}>
        <DailyStack.Screen name="DailyScreen" component={DailyScreen} options={{ headerShown: false }}/>
        <DailyStack.Screen name="ReviewDay" component={ReviewDayScreen as ComponentType} options={{ title: '' }}/>
        <DailyStack.Screen name="ScopeDay" component={WeeklyScreen as ComponentType} options={{ title: '' }}/>
      </DailyStack.Navigator>
    );
  }

  function WeeklyStackScreen() {
    return (
      <DailyStack.Navigator
        screenOptions={{
          headerBackTitle: 'Week',
          headerTintColor: '#767577',
      }}>
        <DailyStack.Screen name="WeeklyScreen" component={WeeklyScreen} options={{ headerShown: false }}/>
        <DailyStack.Screen name="ReviewWeek" component={ReviewWeekScreen as ComponentType} options={{ title: '' }}/>
        <DailyStack.Screen name="ScopeWeek" component={QuarterlyScreen as ComponentType} options={{ title: '' }}/>
      </DailyStack.Navigator>
    );
  }

  function QuarterlyStackScreen() {
    return (
      <DailyStack.Navigator>
        <DailyStack.Screen name="QuarterlyScreen" component={QuarterlyScreen} options={{ headerShown: false }}/>
        <DailyStack.Screen name="ReviewQuarter" component={ReviewQuarterScreen as ComponentType} options={{ title: '' }}/>
        {/* <DailyStack.Screen name="ScopeWeek" component={QuarterlyScreen as ComponentType} options={{ title: '' }}/> */}
      </DailyStack.Navigator>
    );
  }

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingVertical: 10,
          },
        }}
      >
        <Tab.Screen name="Quarter" component={QuarterlyStackScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Week" component={WeeklyStackScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Day" component={DailyStackScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    );
  }

  return (
    <TaskContextProvider>
      <NoteContextProvider>
        <SafeAreaView style={styles.container}>
          <MenuProvider>
            <GestureHandlerRootView style={{flex: 1}}>
            <View style={styles.container}>
              {session && session.user ?  
                <NavigationContainer>
                  <MyTabs />
                </NavigationContainer> : 
                <Auth />}
              </View>
            </GestureHandlerRootView>
          </MenuProvider>
        </SafeAreaView>
      </NoteContextProvider>
    </TaskContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
});
