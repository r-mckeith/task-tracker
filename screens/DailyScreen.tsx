import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import { StackNavigationProp } from '@react-navigation/stack'
import FlatList from '../components/FlatList';

export default function HomeScreen() {
  const context = useContext(TaskContext);
  
  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const { state, dispatch } = context;

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const tasks = state.filter(t => t.recurringOptions?.isRecurring);
    console.log(tasks)
    setFilteredTasks(tasks);
    // If you want to dispatch the tasks, you'd have to use an action
    // dispatch({ type: 'FILTER_TASKS', payload: tasks }); 
  }, [state]);

  return (
    <View style={{flex: 1}}>
      <FlatList taskProps={filteredTasks} planningScreen={true} />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('Scope')}
      /> 
    </View>
  );
}

