import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import Task from './Task';

interface NestedListProps {
  taskProps: TaskInterface[];
  planningScreen: boolean;
}

const NestedList: React.FC<NestedListProps> = ({taskProps, planningScreen}) => {
  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  const { dispatch } = context;

  const renderTasks = (parentId: number | null) => {
    return taskProps
      .filter((task) => task.parentId === parentId)
      .map((task) => (
        <View key={task.id} style={parentId !== null ? styles.subtask : undefined}>
           <Task 
          {...task} 
          planningScreen={planningScreen} 
          onAddSubTask={(name, parentId, recurringOptions) => 
            dispatch({ type: 'ADD_TASK', payload: { name, parentId, recurringOptions } })
          }
          onToggleCompleted={() => dispatch({ type: 'TOGGLE_COMPLETED', id: task.id })} 
          onDelete={() => dispatch({ type: 'DELETE_TASK', id: task.id })}
        />
          {renderTasks(task.id)}
        </View>
      ));
    };
    
    return (
      <View style={styles.container}>
        {renderTasks(null)}
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  subtask: {
    marginLeft: 20,
  },
});

export default NestedList;
