// hooks/useTaskContext.tsx
import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { TaskInterface } from '../types/TaskTypes';

// Specify the return type for the function.
type UseTaskContextReturn = {
  loading: boolean;
  state: TaskInterface[] | null;
};

export const useTaskContext = (): UseTaskContextReturn => {
  const context = useContext(TaskContext);
  if (!context) {
    return { loading: true, state: null };
  }
  const { state } = context;
  return { loading: false, state };
};
