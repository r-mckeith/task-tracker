import React, { useReducer, ReactNode } from 'react';
import apiCall from '../api/ApiCall';
import { TaskContext } from './TaskContext';
import { taskReducer } from '../reducers/TaskReducer';

interface TaskContextProviderProps {
  children: ReactNode;
}

const TaskContextProvider: React.FC<TaskContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, apiCall());

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
