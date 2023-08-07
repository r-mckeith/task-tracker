import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { DoStackParamList } from '../../src/types/StackTypes'
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { TaskInterface } from '../../src/types/TaskTypes';
import NestedList from '../../components/list/NestedList';

function HomeScreen() {
  const route = useRoute();
  const { state } = useTaskContext();
  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();

  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const tasks = state.filter(t => t.inScopeQuarter);
    setFilteredTasks(tasks);
  }, [state]);

  function showReviewButton() {
    return route.name === 'QuarterlyScreen' && filteredTasks.length > 3
  }

  return (
    <View style={{ flex: 1 }}>
      <NestedList taskProps={filteredTasks}/>
      <View style={styles.addButtonContainer}>
        {showReviewButton() && 
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ReviewQuarter')}>
              <Text style={styles.addButtonText}>Review</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default HomeScreen;
