import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TaskInterface } from '../../src/types/TaskTypes';
import { DoStackParamList } from '../../src/types/StackTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { useDateContext } from '../../src/contexts/date/useDateContext';
import { isInSelectedWeek } from '../../helpers/dateHelpers';
import TaskContainer from '../../components/task/TaskContainer';
import Header from '../../components/Header';

export default function WeeklyScreen() {
  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();
  const { state: tasks } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const { selectedDate, setSelectedDate } = useDateContext();


  function isTaskForSelectedWeek(task: TaskInterface) {
    return task.inScopeWeek && isInSelectedWeek(task.inScopeWeek, selectedDate);
  };

  function isTaskRecurring(task: TaskInterface) {
    return task.recurringOptions && task.recurringOptions.isRecurring;
  }

  useEffect(() => {
    const weeklyTasks = tasks.filter((t) => (isTaskForSelectedWeek(t) || isTaskRecurring(t)));
    setFilteredTasks(weeklyTasks);
  }, [tasks, selectedDate]);

  return (
    <>
      <Header
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <View style={styles.container}>
      <TaskContainer
        tasks={filteredTasks}
      />
         <View style={styles.addButtonContainer}>
         <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('MonthlyDuo')}>
           <Text style={styles.addButtonText}>Done</Text>
         </TouchableOpacity>
       </View>
    </View>
    </>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  addButtonContainer: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
  },
});
