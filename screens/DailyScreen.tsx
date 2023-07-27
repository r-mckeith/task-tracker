import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import { RootStackParamList } from '../src/types/RootStackTypes'
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
  
  const { state } = context;

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const tasks = state.filter(t => t.recurringOptions?.isRecurring);
    setFilteredTasks(tasks);
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

