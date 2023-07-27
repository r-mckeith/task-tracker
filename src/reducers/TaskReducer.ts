import { TaskInterface } from '../types/TaskTypes'; 

export type Action =
  | { type: 'TOGGLE_COMPLETED'; id: number }
  | { type: 'TOGGLE_SCOPE'; id: number }
  | { type: 'ADD_TASK'; payload: { 
      name: string, 
      parentId: number, 
      recurringOptions: {
        isRecurring: boolean, 
        selectedDays: string, 
        timesPerDay: string
        } 
      },
      inScopeDay: boolean;
    }
  | { type: 'DELETE_TASK'; id: number };

export const taskReducer = (state: TaskInterface[], action: Action): TaskInterface[] => {
  switch (action.type) {
    case 'TOGGLE_COMPLETED':
      return state.map((task) => {
        if (task.id === action.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      case 'TOGGLE_SCOPE':
      return state.map((task) => {
        if (task.id === action.id) {
          return { ...task, inScopeDay: !task.inScopeDay };
        }
        return task;
      });
      case 'ADD_TASK':
        const { name, parentId, recurringOptions } = action.payload;
        
        const parentTask = state.find(task => task.id === parentId);
        const depth = parentTask ? parentTask.depth + 1 : 0;
    
        const newTask = {
          id: state.length + 1,
          name,
          parentId,
          completed: false,
          recurringOptions,
          depth,
          inScopeDay: action.inScopeDay !== undefined ? action.inScopeDay : false,
        };
        return [...state, newTask];
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
};
