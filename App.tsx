import React from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import 'react-native-url-polyfill/auto';
import Auth from './components/auth/Auth';
import TaskContextProvider from './src/contexts/tasks/TaskContextProvider';
import NoteContextProvider from './src/contexts/notes/NoteContextProvider';
import { MyTabs } from './screens/TabNavigator';
import { useSession } from './src/contexts/sessions/UseSessionHook';
import styles from './styles/globalStyles';

export default function App() {
  const session = useSession();

  return (
    <TaskContextProvider>
      <NoteContextProvider>
        <SafeAreaView style={styles.container}>
          <MenuProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              {session && session.user ?  
                <NavigationContainer>
                  <MyTabs />
                </NavigationContainer> : 
                <Auth />}
            </GestureHandlerRootView>
          </MenuProvider>
        </SafeAreaView>
      </NoteContextProvider>
    </TaskContextProvider>
  );
}