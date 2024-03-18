import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { useTagContext } from '../src/contexts/tags/UseTagContext';
import { useDateContext } from '../src/contexts/date/useDateContext';
import TaskContainer from '../components/list/TaskContainer';
import Header from '../components/ListHeader';
import AddTask from '../components/list/AddTask';

export default function MonthlyScreen() {
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const { tags } = useTagContext();
  const { selectedDate, setSelectedDate } = useDateContext();

  const listTags = showCompleted ? tags.filter(tag => tag.section === 'today') : tags.filter(tag => tag.section === 'today' && !tag.completed)

  return (
    <>
      <Header
        title={''}
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate}
      />
      <View style={styles.toggleAndAddContainer}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Show Completed</Text>
          <Switch
            value={showCompleted}
            onValueChange={setShowCompleted}
          />
        </View>
        <View style={styles.addButton}>
          <AddTask parentId={0} depth={0} />
        </View>
      </View>
      <View style={styles.container}>
        <TaskContainer tags={listTags} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleAndAddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: 8,
  },
  addButton: {
    marginRight: 20
  }
});
