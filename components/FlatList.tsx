import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import useTaskActions from '../lib/useTaskActions';
import { TaskInterface } from '../src/types/Types';
import Task from './Task'

interface FlatListProps {
  taskProps: TaskInterface[];
  planningScreen: boolean;
}

const FlatList: React.FC<FlatListProps> = ({taskProps, planningScreen}) => {
  const { handleTaskPress, addTask, toggleCompleted, deleteTask } = useTaskActions();

  const renderTasks = (tasks: TaskInterface[]) => {
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
          inScopeWeek={task.inScopeWeek}
          inScopeDay={task.inScopeDay}
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
