import React, { useContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TaskInterface } from '../src/types/TaskTypes';
import { TaskContext } from '../src/contexts/TaskContext';
import NestedList from '../components/NestedList';
import FlatList from '../components/FlatList';

const Tab = createMaterialTopTabNavigator();

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
    <Tab.Navigator>
      <Tab.Screen name="Add" children={() => <FlatList taskProps={filteredTasks} planningScreen={false} currentTab={'Add'} />} />
      <Tab.Screen name="Adjust" children={() => <NestedList taskProps={state} planningScreen={false} currentTab={'Adjust'}/>} />
    </Tab.Navigator>
  );
}

export default HomeScreen;