import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTaskContext } from '../src/contexts/tasks/UseTaskContext';
import { useDateContext } from '../src/contexts/date/useDateContext';
import TaskContainer from '../components/task/TaskContainer';
import Header from '../components/Header';
import AddTask from '../components/task/AddTask';
import { useFilteredTasks } from '../src/hooks/useFilteredTasks';

type ScopeType = 'week' | 'day' | 'month';

export default function MonthlyScreen() {
  const { state: tasks } = useTaskContext();
  const { selectedDate, setSelectedDate } = useDateContext();
  const [selectedScope, setSelectedScope] = useState<ScopeType>('month');

  return (
    <>
      <Header
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <AddTask parentId={0} depth={0}/>
      <View style={styles.container}>
        <TaskContainer
          tasks={tasks}
          filter={selectedScope}
        />
      </View>
    </>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
