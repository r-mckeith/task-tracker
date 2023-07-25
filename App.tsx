import React from 'react';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import Account from './components/Account'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Session } from '@supabase/supabase-js'
import SortableListComponent from './components/SortableList';
import NestedList from './components/NestedList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import Task from './components/Task';


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

  const tasks = [
    {
      id: '1',
      name: 'Task 1',
      description: 'This is the first task',
      parentId: null,
      completed: false,
    },
    {
      id: '2',
      name: 'Task 2',
      description: 'This is the second task',
      parentId: null,
      completed: true,
    },
    // Add more tasks as needed
  ];

  const handleTaskPress = (taskId: string) => {
  // Implement logic to handle the task press here
    console.log(`Task with ID ${taskId} is pressed.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}>
          {/* loads the account component if there's an active session and user, */}
          {/* loads the auth component if there's not */}
          {/* the account component will be replaced w the today screen for default, but leaving it in for now */}
          {/* {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} */}
          {/* <SortableListComponent /> */}
          <NestedList />
          {/* {tasks.map((task) => (
            <Task
              key={task.id}
              name={task.name}
              description={task.description}
              parentId={task.parentId}
              completed={task.completed}
              onPress={() => handleTaskPress(task.id)}
            />
          ))} */}
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

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import TaskItem from './components/ListItem';

// const App: React.FC = () => {
//   const tasks = [
//     {
//       id: '1',
//       title: 'Task 1',
//       description: 'This is the first task',
//       completed: false,
//     },
//     {
//       id: '2',
//       title: 'Task 2',
//       description: 'This is the second task',
//       completed: true,
//     },
//     // Add more tasks as needed
//   ];

//   const handleTaskPress = (taskId: string) => {
//     // Implement logic to handle the task press here
//     console.log(`Task with ID ${taskId} is pressed.`);
//   };

//   return (
//     <View style={styles.container}>
//       {tasks.map((task) => (
//         <TaskItem
//           key={task.id}
//           title={task.title}
//           description={task.description}
//           completed={task.completed}
//           onPress={() => handleTaskPress(task.id)}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
// });

// export default App;
