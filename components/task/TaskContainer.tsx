import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { isRouteNameInScope } from '../../helpers/taskHelpers';
import { TaskInterface } from '../../src/types/TaskTypes';
import NestedList from '../NestedList';
import { DoStackParamList } from '../../src/types/StackTypes';

type TaskContainerProps = {
  tasks: TaskInterface[];
  navigateToAdd: keyof DoStackParamList;
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

const styles=StyleSheet.create({
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
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
