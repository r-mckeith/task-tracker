import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { DoStackParamList } from '../src/types/StackTypes'
import { TaskInterface } from '../src/types/TaskTypes';
import { useTaskContext } from '../src/contexts/UseTaskContext';
import NestedList from '../components/NestedList';

function HomeScreen() {
  const { loading, state } = useTaskContext();

  if (loading || !state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const tasks = state.filter(t => t.inScopeWeek);
    setFilteredTasks(tasks);
  }, [state]);

  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();

  return (
    <View style={[styles.container, { justifyContent: filteredTasks.length === 0 ? 'center' : 'flex-start' }]}>
      {filteredTasks.length > 0 &&
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks} currentTab={'Week'}/>
        </View>
      }
        <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ScopeWeek')}>
          <Text style={styles.addButtonText}>Add Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ReviewWeek')}>
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
  loadingText: {
    fontSize: 18,
    color: '#333',
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
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default HomeScreen;
