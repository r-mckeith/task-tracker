import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { TaskInterface } from '../../src/types/TaskTypes';
import NestedList from '../NestedList';
import { ScrollView } from 'react-native-gesture-handler';

type TaskContainerProps = {
  tasks: TaskInterface[];
  filter: string;
};

export default function TaskContainer({ tasks, filter }: TaskContainerProps) {

  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        <ScrollView style={styles.taskList}>
          <NestedList taskProps={tasks} filter={filter} />
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer} />
      )}
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  taskList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
