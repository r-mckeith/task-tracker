import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTaskContext } from '../src/contexts/UseTaskContext';
import { TaskInterface } from '../src/types/TaskTypes';
import NestedList from '../components/NestedList';

function HomeScreen() {
  const { loading, state } = useTaskContext();

  if (loading || !state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const tasks = state.filter(t => t.inScopeQuarter);
    setFilteredTasks(tasks);
  }, [state]);

  return (
    <View style={{flex: 1}}>
      <NestedList taskProps={filteredTasks} currentTab={'Quarter'} />    
    </View>
  );
}

export default HomeScreen;