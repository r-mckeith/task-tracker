import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import { RootStackParamList } from '../src/types/RootStackTypes'
import { StackNavigationProp } from '@react-navigation/stack'
import FlatList from '../components/FlatList';

export default function HomeScreen() {
  // Use the useContext hook to get the current context, which in this case is the TaskContext
  // This context is used to pass down state and allow components to consume it
  const context = useContext(TaskContext);
  
  // If the context has not yet loaded (i.e., is undefined), show a loading screen
  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  // The useNavigation hook is used to allow this component to perform navigation actions.
  // We specify the StackNavigationProp to define the shape of our navigation stack.
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  
  // Destructuring to get the 'state' value from the context. The state here refers to the tasks data.
  const { state } = context;

  // Initialize filteredTasks as a state with an empty array, and its type is an array of TaskInterface.
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  // A useEffect hook is used to perform side effects. In this case, when 'state' changes,
  // we filter tasks that are recurring and update our 'filteredTasks' state.
  useEffect(() => {
    const tasks = state.filter(t => t.recurringOptions?.isRecurring);
    setFilteredTasks(tasks);
  }, [state]);

  // The component's rendered JSX. It contains a FlatList component and a button.
  return (
    <View style={{flex: 1}}>
      <FlatList taskProps={filteredTasks} planningScreen={true} />
      <Button
        title="Add Task"
        // The onPress prop is used to specify what happens when the button is pressed.
        // In this case, it navigates to the 'Scope' screen.
        onPress={() => navigation.navigate('Scope')}
      /> 
    </View>
  );
}

