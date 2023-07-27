import { TaskInterface } from '../types/TaskTypes'; 

export type Action =
  | { type: 'COMPLETE_TASK'; id: number }
  | { type: 'ADD_TASK'; task: TaskInterface }
  | { type: 'DELETE_TASK'; id: number };

export const taskReducer = (state: TaskInterface[], action: Action): TaskInterface[] => {
  switch (action.type) {
    case 'COMPLETE_TASK':
      return state.map((task) => {
        if (task.id === action.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    case 'ADD_TASK':
      return [...state, action.task];
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
};
