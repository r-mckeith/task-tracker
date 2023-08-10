import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../styles/screens/dailyScreen'
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { TaskInterface } from '../../src/types/TaskTypes';
import NestedList from '../list/NestedList';
import { DoStackParamList } from '../../src/types/StackTypes';

type TaskScreenProps = {
  filterTasks: (tasks: TaskInterface[]) => TaskInterface[];
  navigateToAdd: keyof DoStackParamList;
  navigateToReview: keyof DoStackParamList;
};

export default function TaskScreen({ filterTasks, navigateToAdd, navigateToReview }: TaskScreenProps) {
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const { state } = useTaskContext();
  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();

  useEffect(() => {
    setFilteredTasks(filterTasks(state));
  }, [state]);

  const currentDate = new Date();
  const dateFormatted = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

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
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(navigateToAdd)}>
          <Text style={styles.addButtonText}>Add Tasks</Text>
        </TouchableOpacity>
        {showReviewButton && (
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(navigateToReview)}>
            <Text style={styles.addButtonText}>Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}