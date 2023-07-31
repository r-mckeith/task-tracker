import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import Task from './Task'

interface FlatListProps {
  taskProps: TaskInterface[];
  currentTab: string;
}

const FlatList: React.FC<FlatListProps> = ({taskProps, currentTab}) => {
  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { dispatch } = context;

  const renderTasks = (tasks: TaskInterface[]) => {
    return tasks.map((task) => (
      <View key={task.id}>
        <Task 
          {...task} 
          currentTab={currentTab}
          onAddTask={(name, parentId, recurringOptions) => 
            dispatch({ 
              type: 'ADD_TASK', 
              payload: { 
                name, 
                parentId, 
                depth: 0,
                recurringOptions,
              }, 
            })
          }
          onToggleDay={() => dispatch({ type: 'TOGGLE_DAY', id: task.id })} 
          onToggleWeek={() => dispatch({ type: 'TOGGLE_WEEK', id: task.id })} 
        />
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