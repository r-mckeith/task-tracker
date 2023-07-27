import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FlatList from '../components/FlatList';
import { TaskInterface } from '../src/types/Types';
import apiCall from '../src/apiCall';
import { StackNavigationProp } from '@react-navigation/stack';


export default function DailyScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

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
