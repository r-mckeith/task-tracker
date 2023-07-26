import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import useTaskActions from '../lib/useTaskActions';
import Task from './Task'

interface Task {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  recurringOptions: {
    isRecurring: boolean | null;
    selectedDays: string | null;
    timesPerDay: string | null;
  }
  depth: number;
}

interface FlatListProps {
  taskProps: Task[];
  planningScreen: boolean;
}

const FlatList: React.FC<FlatListProps> = ({taskProps, planningScreen}) => {
  const { handleTaskPress, addTask, toggleCompleted, deleteTask } = useTaskActions();

  const renderTasks = (tasks: Task[]) => {
    return tasks.map((task) => (
      <View key={task.id} style={task.parentId !== null ? styles.subtask : undefined}>
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          parentId={task.parentId}
          depth={task.depth}
          planningScreen={planningScreen}
          completed={task.completed}
          onPress={() => handleTaskPress(task.id)}
          onAddSubTask={(name, parentId, {isRecurring, selectedDays, timesPerDay}) => 
            addTask(name, parentId, {isRecurring, selectedDays, timesPerDay})
          }
          onToggleCompleted={toggleCompleted}
          onDelete={deleteTask}
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

export default FlatList;
