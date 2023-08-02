import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TaskInterface } from '../src/types/TaskTypes'
import Task from './Task';

interface NestedListProps {
  taskProps: TaskInterface[];
  currentTab: string;
}

const NestedList: React.FC<NestedListProps> = ({taskProps, currentTab}) => {

  const findRootTasks = () => {
    const allIds = new Set(taskProps.map(task => task.id));
    return taskProps.filter(task => !task.parentId || !allIds.has(task.parentId));
  };
  
  const renderTasks = (parentId: number | null) => {
    // Find root tasks if parentId is null, else find children of the current task
    const tasksToRender = parentId === null ? findRootTasks() : taskProps.filter(task => task.parentId === parentId);
    
    // Sort and map through tasks to render them and their children (if any)
    return tasksToRender
      .sort((a, b) => a.id - b.id)
      .map((task, index) => (
        <View 
          key={task.id} 
          style={[
            parentId !== null ? styles.subtask : undefined,
            parentId === null && index !== 0 ? styles.headerSpacing : undefined,
          ]}
        >
          <Task {...task} currentTab={currentTab}/>
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
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerSpacing: {
    marginTop: 20,
  },
  subtask: {
    marginLeft: 20,
    borderRadius: 10,
  },
});


export default NestedList;
