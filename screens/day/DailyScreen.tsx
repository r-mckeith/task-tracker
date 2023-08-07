import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../styles/screens/dailyScreen'
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { TaskInterface } from '../../src/types/TaskTypes';
import NestedList from '../../components/list/NestedList';
import { DoStackParamList } from '../../src/types/StackTypes';

export default function DailyScreen() {
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const { state } = useTaskContext();
  const currentDate = new Date();
  const dateFormatted = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const tasks = state.filter((t) => t.inScopeDay);
    setFilteredTasks(tasks);
  }, [state]);

  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();
  const showReviewButton = filteredTasks.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{dateFormatted}</Text>
      </View>
      {filteredTasks.length > 0 ? (
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks} />
        </View>
      ) : (
        <View style={styles.emptyContainer} />
      )}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ScopeDay')}>
          <Text style={styles.addButtonText}>Add Tasks</Text>
        </TouchableOpacity>
        {showReviewButton && (
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ReviewDay')}>
            <Text style={styles.addButtonText}>Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

