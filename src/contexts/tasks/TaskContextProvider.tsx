import React, { useEffect, useReducer, ReactNode } from 'react';
import { getTasks } from '../../api/SupabaseTasks';
import { TaskContext } from './TaskContext';
import { taskReducer } from '../../reducers/TaskReducer';

interface TaskContextProviderProps {
  children: ReactNode;
}

const TaskContextProvider: React.FC<TaskContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      console.log("Current tasks state:", state);
      dispatch({ type: 'INITIALIZE', payload: tasks });
    };

    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
