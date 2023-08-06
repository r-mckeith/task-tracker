import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DoStackParamList } from '../src/types/StackTypes'
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { useTaskContext } from '../src/contexts/UseTaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import NestedList from '../components/NestedList';

export default function HomeScreen() {
  const route = useRoute();
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  const { loading, state } = useTaskContext();

  if (loading || !state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currentDate = new Date();
  const dateFormatted = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });


  useEffect(() => {
    // @ts-ignore
    const tasks = state.filter(t => (t.inScopeDay));
    setFilteredTasks(tasks);
  }, [state]);

  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();

  function showReviewButton() {
    return filteredTasks.length > 0
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{dateFormatted}</Text>
      </View>
      {filteredTasks.length > 0 ? (
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks} currentTab={'Day'} />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          {/* You can place some message or illustration for empty state here */}
        </View>
      )}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ScopeDay')}>
          <Text style={styles.addButtonText}>Add Tasks</Text>
        </TouchableOpacity>
        {showReviewButton() && (
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ReviewDay')}>
            <Text style={styles.addButtonText}>Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
