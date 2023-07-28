import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import Task from './Task';

interface NestedListProps {
  taskProps: TaskInterface[];
  planningScreen: boolean;
  currentTab?: string;
}

const NestedList: React.FC<NestedListProps> = ({taskProps, planningScreen, currentTab}) => {

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
          currentTab={currentTab}
          onAddSubTask={(name, parentId, recurringOptions) => 
            dispatch({ 
              type: 'ADD_TASK', 
              payload: { name, parentId, recurringOptions }, 
              inScopeDay: false,
              inScopeWeek: false,
            })
          }
          onToggleCompleted={() => dispatch({ type: 'TOGGLE_COMPLETED', id: task.id })} 
          onToggleDay={() => dispatch({ type: 'TOGGLE_WEEK', id: task.id })} 
          onToggleWeek={() => dispatch({ type: 'TOGGLE_WEEK', id: task.id })} 
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
    backgroundColor: '#F5F5F5', // Light grey color for the background
  },
  input: {
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10, // Rounded corners
    backgroundColor: 'white', // White color for input
    shadowColor: "#000", // Shadow for depth
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subtask: {
    marginLeft: 20,
    marginTop: 10, // Give some space for each subtask
    padding: 10,
    backgroundColor: 'white', // White color for subtask
    borderRadius: 10, // Rounded corners
    shadowColor: "#000", // Shadow for depth
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});


export default NestedList;
