import React, { useReducer, ReactNode } from 'react';
import getTasks from '../api/getTasks';
import { TaskContext } from './TaskContext';
import { taskReducer } from '../reducers/TaskReducer';

interface TaskContextProviderProps {
  children: ReactNode;
}

const TaskContextProvider: React.FC<TaskContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, getTasks());

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
