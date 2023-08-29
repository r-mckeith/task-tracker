import { useCallback } from 'react';

export default function useTaskActions() {

  const handleTaskPress = useCallback((taskId: number) => {
    // Implementation goes here
  }, []);

    return { handleTaskPress };
}

export const addTask = (name, parentId, recurringOptions) => {
  return {
    type: 'ADD_TASK',
    payload: {
      name,
      parentId,
      recurringOptions,
    },
  };
};