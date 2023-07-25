import React from 'react';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Session } from '@supabase/supabase-js'
import NestedList from './components/NestedList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}>
          {/* {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} */}
          <NestedList />
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
