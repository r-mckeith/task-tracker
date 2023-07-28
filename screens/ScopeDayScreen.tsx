import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TaskInterface } from '../src/types/TaskTypes';
import { TaskContext } from '../src/contexts/TaskContext';
import FlatList from '../components/FlatList';

function HomeScreen() {
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
    const tasks = state.filter(t => t.inScopeWeek);
    setFilteredTasks(tasks);
  }, [state]);

  return (
    <View style={{flex: 1}}>
      <FlatList taskProps={filteredTasks} planningScreen={false} currentTab={'Day'} />    
    </View>
  );
}

export default HomeScreen;