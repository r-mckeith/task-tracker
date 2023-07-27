import { useState, useCallback } from 'react';
import { TaskInterface } from '../src/types/Types';

const useTaskActions = () => {
  // assuming tasks are managed in a state hook
  const [tasks, setTasks] = useState<TaskInterface[]>([]);


  const handleTaskPress = useCallback((taskId: number) => {
    // Implementation goes here
  }, [tasks]);

  const addTask = useCallback((name: string, parentId: number, options: {isRecurring: boolean | null; selectedDays: string | null; timesPerDay: string | null;}) => {
    // Implementation goes here
  }, [tasks]);

  const toggleCompleted = useCallback((taskId: number) => {
    // Implementation goes here
  }, [tasks]);

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

  return { handleTaskPress, addTask, toggleCompleted, deleteTask };
};

export default useTaskActions;
