import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
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
  
  const { state } = context;

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const tasks = state.filter(t => (t.recurringOptions?.isRecurring || t.inScopeDay));
    setFilteredTasks(tasks);
  }, [state]);

  return (
    <View style={{flex: 1}}>
      <FlatList taskProps={filteredTasks} planningScreen={true} />
    </View>
  );
}

