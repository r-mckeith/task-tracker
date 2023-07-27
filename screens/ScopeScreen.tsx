import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TaskInterface } from '../src/types/Types';
import apiCall from '../src/apiCall';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NestedList from '../components/NestedList';

const Tab = createMaterialTopTabNavigator();

function HomeScreen() {
  const [tasks, setTasks] = useState<TaskInterface[]>(apiCall);

  useEffect(() => {
    const allTasks = apiCall()
    setTasks(allTasks)
  }, [])

  return (
    <Tab.Navigator>
      <Tab.Screen name="Add" children={() => <NestedList taskProps={tasks} planningScreen={false} />} />
      <Tab.Screen name="Adjust" children={() => <NestedList taskProps={tasks} planningScreen={false} />} />
    </Tab.Navigator>
  );
}

export default HomeScreen;