import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskInterface } from '../src/types/TaskTypes';
import { TaskContext } from '../src/contexts/TaskContext';
import FlatList from '../components/FlatList';

function HomeScreen() {
  const context = useContext(TaskContext);
  
  if (!context) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
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
    <View style={styles.container}>
      <FlatList taskProps={filteredTasks} currentTab={'Day'} />    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
});

export default HomeScreen;
