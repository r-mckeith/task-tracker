import React from 'react';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DailyScreen from './screens/DailyScreen';
import WeeklyScreen from './screens/WeeklyScreen'
import PlanScreen from './screens/PlanScreen'
import ReviewScreen from './screens/ReviewScreen'
import ScopeScreen from './screens/ScopeScreen';

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
        <Tab.Screen name="Do" component={DailyScreen} />
        <Tab.Screen name="Scope" component={ScopeScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Review" component={ReviewScreen} />
      </Tab.Navigator>
    );
  }

  return (
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
