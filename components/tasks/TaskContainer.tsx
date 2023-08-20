import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../styles/screens/dailyScreen'
import { isRouteNameInScope } from '../../helpers/taskHelpers';
import { TaskInterface } from '../../src/types/TaskTypes';
import NestedList from '../NestedList';
import { DoStackParamList } from '../../src/types/StackTypes';

type TaskContainerProps = {
  tasks: TaskInterface[];
  navigateToAdd: keyof DoStackParamList;
  navigateToReview: keyof DoStackParamList;
};

export default function TaskContainer({ tasks, navigateToAdd }: TaskContainerProps) {
  const navigation = useNavigation<StackNavigationProp<DoStackParamList>>();
  const route = useRoute();

  function showAddTasksButton() {
    const scopeRoutes = ['DailyScreen', 'WeeklyScreen'];
    return isRouteNameInScope(route.name, scopeRoutes);
  }

  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        <View style={styles.taskList}>
          <NestedList taskProps={tasks} />
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

