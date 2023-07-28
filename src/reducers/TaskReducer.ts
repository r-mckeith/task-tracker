import { TaskInterface } from '../types/TaskTypes'; 

export type Action =
  | { type: 'TOGGLE_COMPLETED'; id: number }
  | { type: 'TOGGLE_SCOPE'; id: number, currentTab: string }
  | { type: 'ADD_TASK'; payload: { 
      name: string, 
      parentId: number, 
      recurringOptions: {
        isRecurring: boolean, 
        selectedDays: string, 
        timesPerDay: string
        } 
      }, inScopeDay: boolean;
    }
  | { type: 'DELETE_TASK'; id: number };

  const findChildTasks = (taskId: number, tasks: TaskInterface[]): TaskInterface[] => {
    const directChildren = tasks.filter(task => task.parentId === taskId);
    let allChildren = [...directChildren];
  
    directChildren.forEach(child => {
      const grandchildren = findChildTasks(child.id, tasks);
      allChildren = [...allChildren, ...grandchildren];
    });
  
    return allChildren;
  };

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
      const parentTask = state.find((task) => task.id === action.id);
    
      if (!parentTask) {
        return state;
      }
    
      const descendants = findChildTasks(action.id, state);
    
      if (action.currentTab === 'Add') {
        const newScopeDay = !parentTask.inScopeDay;
    
        return state.map((task) => {
          if (task.id === action.id || descendants.some(descendant => descendant.id === task.id)) {
            return { ...task, inScopeDay: newScopeDay };
          }
          return task;
        });
      } else if (action.currentTab === 'Adjust') {
        const newScopeWeek = !parentTask.inScopeWeek;
        const newScopeDay = newScopeWeek ? parentTask.inScopeDay : false;
    
        return state.map((task) => {
          if (task.id === action.id || descendants.some(descendant => descendant.id === task.id)) {
            return { ...task, inScopeWeek: newScopeWeek, inScopeDay: newScopeDay };
          }
          return task;
        });
      }
      return state;
    case 'ADD_TASK':
        const { name, parentId, recurringOptions } = action.payload;
        const parentTaskForAdd = state.find((task) => task.id === parentId);
        const depth = parentTaskForAdd ? parentTaskForAdd.depth + 1 : 0;
      
        const newTask = {
          id: state.length + 1,
          name,
          parentId,
          completed: false,
          recurringOptions,
          depth,
          inScopeDay: action.inScopeDay !== undefined ? action.inScopeDay : false,
          inScopeWeek: parentTaskForAdd ? parentTaskForAdd.inScopeWeek : false,
        };
      
        return [...state, newTask];
      
      case 'DELETE_TASK': {
          const childTasks = findChildTasks(action.id, state);
          const allChildIds = childTasks.map(task => task.id);
          return state.filter(task => task.id !== action.id && !allChildIds.includes(task.id));
        }
        
      
    default:
      return state;
  }
};
