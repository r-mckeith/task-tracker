import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { DoStackParamList } from '../../src/types/StackTypes'
import { TaskInterface } from '../../src/types/TaskTypes';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import NestedList from '../../components/list/NestedList';

function HomeScreen() {
  const route = useRoute();
  const { state } = useTaskContext();

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const tasks = state.filter(t => t.inScopeWeek);
    setFilteredTasks(tasks);
  }, [state]);

  function showButtons() {
    return route.name === 'WeeklyScreen'
  }

  function showReviewButton() {
    return route.name === 'WeeklyScreen' && filteredTasks.length > 0
  }

  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();

  return (
    <View style={[styles.container, { justifyContent: filteredTasks.length === 0 ? 'center' : 'flex-start' }]}>
      {route.name === 'ScopeDay' && 
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Add tasks to your day</Text>
        </View>
      }
      {route.name === "WeeklyScreen" && 
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Week of </Text>
        </View>
      }
      {filteredTasks.length > 0 &&
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks}/>
        </View>
      }
      {showButtons() && 
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ScopeWeek')}>
            <Text style={styles.addButtonText}>Add Goals</Text>
          </TouchableOpacity>
          {showReviewButton() && 
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ReviewWeek')}>
              <Text style={styles.addButtonText}>Review</Text>
            </TouchableOpacity>
          }
        </View>
      }
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
  headerContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    color: '#767577',
    fontSize: 20,
    fontWeight: 'bold',
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
