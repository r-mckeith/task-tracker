import { TaskInterface } from '../types/TaskTypes'; 
import { findChildTasks, findParentTasks } from '../../helpers/taskHelpers';

export type Action =
  | { type: 'INITIALIZE'; payload: TaskInterface[] }
  | { type: 'TOGGLE_COMPLETED'; id: number }
  | { type: 'TOGGLE_DAY'; id: number }
  | { type: 'TOGGLE_WEEK'; id: number }
  | { type: 'DELETE_TASK'; id: number }
  | { type: 'ADD_TASK'; payload: TaskInterface }

  const updateScopeDay = (
    state: TaskInterface[],
    actionId: number
  ): TaskInterface[] => {
    const taskForDay = state.find((task) => task.id === actionId);
  
    if (!taskForDay) {
      return state;
    }
  
    const descendantsDay = findChildTasks(actionId, state);
    const ancestorsDay = findParentTasks(actionId, state);
    const siblingsDay = taskForDay.parentId ? state.filter(task => task.parentId === taskForDay.parentId) : [];
  
    const newScopeDay = !taskForDay.inScopeDay;
  
    return state.map((task) => {
      if (task.id === actionId || descendantsDay.some(descendant => descendant.id === task.id)) {
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
  };
  
  const updateScopeWeek = (
    state: TaskInterface[],
    actionId: number
  ): TaskInterface[] => {
    const taskForWeek = state.find((task) => task.id === actionId);
  
    if (!taskForWeek) {
      return state;
    }
  
    const descendantsWeek = findChildTasks(actionId, state);
    const ancestorsWeek = findParentTasks(actionId, state);
    const siblingsWeek = taskForWeek.parentId ? state.filter(task => task.parentId === taskForWeek.parentId) : [];
  
    const newScopeWeek = !taskForWeek.inScopeWeek;
    const newScopeDayFromWeek = newScopeWeek ? taskForWeek.inScopeDay : false;
  
    return state.map((task) => {
      if (task.id === actionId || descendantsWeek.some(descendant => descendant.id === task.id)) {
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
  };

  const updateCompletedStatus = (
    state: TaskInterface[],
    actionId: number
  ): TaskInterface[] => {
    const taskForCompleted = state.find((task) => task.id === actionId);
  
    if (!taskForCompleted) {
      return state;
    }
  
    const descendantsCompleted = findChildTasks(actionId, state);
    const ancestorsCompleted = findParentTasks(actionId, state);
    const siblingsCompleted = taskForCompleted.parentId ? state.filter(task => task.parentId === taskForCompleted.parentId) : [];
    
    const newCompletedStatus = !taskForCompleted.completed;
  
    return state.map((task) => {
      if (task.id === actionId || descendantsCompleted.some(descendant => descendant.id === task.id)) {
        return { ...task, completed: newCompletedStatus };
      }
      if (newCompletedStatus && siblingsCompleted.every(sibling => sibling.completed) && taskForCompleted.parentId === task.parentId) {
        return { ...task, completed: newCompletedStatus };
      }
      if (!newCompletedStatus && ancestorsCompleted.some(ancestor => ancestor.id === task.id)) {
        return { ...task, completed: newCompletedStatus };
      }
      return task;
    });
  };
  
export const taskReducer = (state: TaskInterface[], action: Action): TaskInterface[] => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload;
    case 'TOGGLE_COMPLETED':
      return updateCompletedStatus(state, action.id);
    case 'TOGGLE_DAY':
      return updateScopeDay(state, action.id);
    case 'TOGGLE_WEEK':
      return updateScopeWeek(state, action.id);
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK': {
      const childTasks = findChildTasks(action.id, state);
      const allChildIds = childTasks.map(task => task.id);
      return state.filter(task => task.id !== action.id && !allChildIds.includes(task.id));
    }
    default:
      return state;
  }
};
