import React from 'react';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import { View, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'
// import SortableListComponent from './components/SortableList';
import NestedSortableList from './components/NestedSortableList';


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
    <View style={styles.container}>
      {/* loads the account component if there's an active session and user, */}
      {/* loads the auth component if there's not */}
      {/* the account component will be replaced w the today screen for default, but leaving it in for now */}
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
      {/* <SortableListComponent /> */}
      <NestedSortableList />
    </View>
  )
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});