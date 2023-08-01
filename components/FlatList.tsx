import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TaskInterface } from '../src/types/TaskTypes'
import Task from './Task'

interface FlatListProps {
  taskProps: TaskInterface[];
  currentTab: string;
}

const FlatList: React.FC<FlatListProps> = ({taskProps, currentTab}) => {

  const renderTasks = (tasks: TaskInterface[]) => {
    return tasks.map((task) => (
      <View key={task.id}>
        <Task {...task} currentTab={currentTab}/>
      </View>
    ));
  };
  
  return (
    <View style={styles.container}>
      {renderTasks(taskProps)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FlatList;