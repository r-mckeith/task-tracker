import { useContext, useState, useCallback } from 'react';
import { TaskContext } from '../contexts/TaskContext';

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

const useTaskActions = () => {
  const { dispatch } = useContext(TaskContext);


  const handleTaskPress = useCallback((taskId: number) => {
    // Implementation goes here
  }, []);

  const addTask = useCallback((name: string, parentId: number, options: {isRecurring: boolean | null; selectedDays: string | null; timesPerDay: string | null;}) => {
    // Implementation goes here
  }, []);

  const toggleCompleted = useCallback((id: number) => {
    // setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
  }, []);

  const deleteTask = useCallback((id: number) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } });
  }, []);

  //  // Function to delete a task
  //  const deleteTask = (id: number) => {
  //   // This will recursively delete all children tasks
  //   const recursiveDelete = (taskId: number) => {
  //     const childTasks = tasks.filter(task => task.parentId === taskId);
  //     for (let childTask of childTasks) {
  //       recursiveDelete(childTask.id);
  //     }
  //     setTasks(tasks => tasks.filter(task => task.id !== taskId));
  //   };

  //   recursiveDelete(id);
  // };

  return { handleTaskPress, addTask, toggleCompleted, deleteTask };
};

export default useTaskActions;