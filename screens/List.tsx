import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTagContext } from '../src/contexts/tags/UseTagContext';
import { useDateContext } from '../src/contexts/date/useDateContext';
import TaskContainer from '../components/list/TaskContainer';
import Header from '../components/Header';
import AddTask from '../components/list/AddTask';
import { useFilteredTasks } from '../src/hooks/useFilteredTasks';

type ScopeType = 'week' | 'day' | 'month';

export default function MonthlyScreen() {
  const { tags } = useTagContext();
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
          tags={tags}
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
