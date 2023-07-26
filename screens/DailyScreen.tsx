import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FlatList from '../components/FlatList';
import apiCall from '../lib/apiCall';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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


export default function DailyScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const filteredTasks = apiCall().filter(t => t.recurringOptions?.isRecurring === true)
    setTasks(filteredTasks)
  }, [])

  return (
    <View style={{flex: 1}}>
    <FlatList taskProps={tasks} planningScreen={true} />
    <Button
      title="Add Task"
      onPress={() => navigation.navigate('Scope')}
    /> 
  </View>
  );
}
