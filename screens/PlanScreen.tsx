import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TaskInterface } from '../src/types/Types';
import apiCall from '../src/apiCall';
import NestedList from '../components/NestedList';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<TaskInterface[]>(apiCall);

  useEffect(() => {
    const allTasks = apiCall()
    setTasks(allTasks)
  }, [])

  return (
    <View style={{flex: 1}}>
      <NestedList taskProps={tasks} planningScreen={true} /> 
    </View>
  );
}