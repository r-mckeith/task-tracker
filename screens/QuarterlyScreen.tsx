import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import NestedList from '../components/NestedList';
import apiCall from '../lib/apiCall';

interface Task {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  recurringOptions: {
    isRecurring: boolean | null;
    selectedDays: string | null;
    timesPerDay: string | null;
  }
  depth: number;
  }

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(apiCall);

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