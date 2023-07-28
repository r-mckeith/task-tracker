import { TaskInterface } from '../types/TaskTypes'; 

export type Action =
  | { type: 'TOGGLE_COMPLETED'; id: number }
  | { type: 'TOGGLE_DAY'; id: number }
  | { type: 'TOGGLE_WEEK'; id: number }
  | { type: 'DELETE_TASK'; id: number }
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
      inScopeWeek: boolean;
    };

const findChildTasks = (taskId: number, tasks: TaskInterface[]): TaskInterface[] => {
  const directChildren = tasks.filter(task => task.parentId === taskId);
  let allChildren = [...directChildren];

  directChildren.forEach(child => {
    const grandchildren = findChildTasks(child.id, tasks);
    allChildren = [...allChildren, ...grandchildren];
  });

  return allChildren;
};

const findParentTasks = (taskId: number, tasks: TaskInterface[]): TaskInterface[] => {
  const parentTask = tasks.find(task => task.id === taskId);
  return parentTask && parentTask.parentId
    ? [...findParentTasks(parentTask.parentId, tasks), parentTask]
    : [];
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
      case 'TOGGLE_DAY':
        const taskForDay = state.find((task) => task.id === action.id);
      
        if (!taskForDay) {
          return state;
        }
      
        const descendantsDay = findChildTasks(action.id, state);
        const ancestorsDay = findParentTasks(action.id, state);
        const siblingsDay = taskForDay.parentId ? state.filter(task => task.parentId === taskForDay.parentId) : [];
      
        const newScopeDay = !taskForDay.inScopeDay;
      
        return state.map((task) => {
          if (task.id === action.id || descendantsDay.some(descendant => descendant.id === task.id)) {
            return { ...task, inScopeDay: newScopeDay };
          }
          if (!newScopeDay && ancestorsDay.some(ancestor => ancestor.id === task.id)) {
            return { ...task, inScopeDay: newScopeDay };
          }
          if (newScopeDay && siblingsDay.every(sibling => sibling.inScopeDay) && taskForDay.parentId === task.parentId) {
            return { ...task, inScopeDay: newScopeDay };
          }
          return task;
        });
      
      case 'TOGGLE_WEEK':
        const taskForWeek = state.find((task) => task.id === action.id);
      
        if (!taskForWeek) {
          return state;
        }
      
        const descendantsWeek = findChildTasks(action.id, state);
        const ancestorsWeek = findParentTasks(action.id, state);
        const siblingsWeek = taskForWeek.parentId ? state.filter(task => task.parentId === taskForWeek.parentId) : [];
      
        const newScopeWeek = !taskForWeek.inScopeWeek;
        const newScopeDayFromWeek = newScopeWeek ? taskForWeek.inScopeDay : false;
      
        return state.map((task) => {
          if (task.id === action.id || descendantsWeek.some(descendant => descendant.id === task.id)) {
            return { ...task, inScopeWeek: newScopeWeek, inScopeDay: newScopeDayFromWeek };
          }
          if (!newScopeWeek && ancestorsWeek.some(ancestor => ancestor.id === task.id)) {
            return { ...task, inScopeWeek: newScopeWeek, inScopeDay: newScopeDayFromWeek };
          }
          if (newScopeWeek && siblingsWeek.every(sibling => sibling.inScopeWeek) && taskForWeek.parentId === task.parentId) {
            return { ...task, inScopeWeek: newScopeWeek };
          }
          return task;
        });
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
