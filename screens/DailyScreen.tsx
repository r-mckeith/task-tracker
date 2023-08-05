import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DoStackParamList } from '../src/types/StackTypes'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { useTaskContext } from '../src/contexts/UseTaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import NestedList from '../components/NestedList';

export default function HomeScreen() {
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  const { loading, state } = useTaskContext();

  if (loading || !state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    // @ts-ignore
    const tasks = state.filter(t => (t.recurringOptions?.isRecurring || t.inScopeDay));
    setFilteredTasks(tasks);
  }, [state]);

  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();

  return (
    <View style={[styles.container, { justifyContent: filteredTasks.length === 0 ? 'center' : 'flex-start' }]}>
      {filteredTasks.length > 0 &&
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks} currentTab={'Day'}/>
        </View>
      }
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ScopeDay')}>
          <Text style={styles.addButtonText}>Add Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ReviewDay')}>
          <Text style={styles.addButtonText}>Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  taskList: {
    flex: 1,
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
