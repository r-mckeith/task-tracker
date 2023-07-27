import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TaskInterface } from '../src/types/Types';
import Task from './Task';

interface NestedListProps {
  taskProps: TaskInterface[];
  planningScreen: boolean;
}

export interface TaskDataInterface {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  depth: number;
  inScopeDay: boolean;
  inScopeWeek: boolean;
}

const NestedList: React.FC<NestedListProps> = ({taskProps, planningScreen}) => {
    const [tasks, setTasks] = useState<TaskDataInterface[]>(taskProps);

    // Function to add a new task
    const addTask = (name: string, parentId: number | null, recurringOptions: {isRecurring: boolean | null, selectedDays: string | null, timesPerDay: string | null}) => {
      // Find the parent task in the tasks list
      const parentTask = tasks.find(task => task.id === parentId);
    
      // Calculate the depth based on the parent task's depth
      const depth = parentTask ? parentTask.depth + 1 : 0;
    
      const newTask: TaskDataInterface = {
        id: tasks.length + 1,
        name: name,
        parentId: parentId,
        completed: false,
        depth: depth,
        inScopeDay: false,
        inScopeWeek: false,
      };
      setTasks([...tasks, newTask]);
    };

    const handleTaskPress = (taskId: number) => {
      console.log(`Task with ID ${taskId} is pressed.`);
    };

    // Function to toggle completed status of a task
    const toggleCompleted = (id: number) => {
      setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
    };

    // Function to delete a task
    const deleteTask = (id: number) => {
      // This will recursively delete all children tasks
      const recursiveDelete = (taskId: number) => {
        const childTasks = tasks.filter(task => task.parentId === taskId);
        for (let childTask of childTasks) {
          recursiveDelete(childTask.id);
        }
        setTasks(tasks => tasks.filter(task => task.id !== taskId));
      };

      recursiveDelete(id);
    };


    // Function to render tasks based on parentId
    const renderTasks = (parentId: number | null) => {
      return tasks
        .filter((task) => task.parentId === parentId)
        .map((task) => (
          <View key={task.id} style={parentId !== null ? styles.subtask : undefined}>
            <Task
              {...task} // This is assuming task is of type TaskDataInterface
              onPress={() => handleTaskPress(task.id)}
              onAddSubTask={(name, parentId, {isRecurring, selectedDays, timesPerDay}) => 
                addTask(name, parentId, {isRecurring, selectedDays, timesPerDay})
              }
              onToggleCompleted={toggleCompleted}
              onDelete={deleteTask}
              planningScreen={planningScreen}
              inScopeDay={task.inScopeDay}
              inScopeWeek={task.inScopeWeek}
/>
            {renderTasks(task.id)}
          </View>
        ));
    };
    
    // Render the list of tasks
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
