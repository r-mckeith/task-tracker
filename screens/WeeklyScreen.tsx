import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TaskInterface } from '../src/types/TaskTypes';
import { TaskContext } from '../src/contexts/TaskContext';
import NestedList from '../components/NestedList';

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

  return (
    <View style={{flex: 1}}>
      <NestedList taskProps={state} planningScreen={false} currentTab={'Week'} />    
    </View>
  );
}

export default HomeScreen;