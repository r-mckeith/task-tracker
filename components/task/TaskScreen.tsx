import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../styles/screens/dailyScreen'
import { isRouteNameInScope } from '../../helpers/taskHelpers';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { TaskInterface } from '../../src/types/TaskTypes';
import NestedList from '../list/NestedList';
import { DoStackParamList } from '../../src/types/StackTypes';
import Header from '../Header';

type TaskScreenProps = {
  filterTasks: (tasks: TaskInterface[]) => TaskInterface[];
  navigateToAdd: keyof DoStackParamList;
  navigateToReview: keyof DoStackParamList;
};

export default function TaskScreen({ filterTasks, navigateToAdd }: TaskScreenProps) {
  const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>([]);
  const { state } = useTaskContext();
  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();

  useEffect(() => {
    setFilteredTasks(filterTasks(state));
  }, [state]);

  const route = useRoute();

  function showAddTasksButton() {
    const scopeRoutes = ['DailyScreen', 'WeeklyScreen'];
    return isRouteNameInScope(route.name, scopeRoutes);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      {filteredTasks.length > 0 ? (
        <View style={styles.taskList}>
          <NestedList taskProps={filteredTasks} />
        </View>
      ) : (
        <View style={styles.emptyContainer} />
      )}
      <View style={styles.addButtonContainer}>
        {showAddTasksButton() &&
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(navigateToAdd)}>
            <Text style={styles.addButtonText}>Add Tasks</Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
}
