import addDays from 'date-fns/addDays';
import { TaskInterface } from '../types/TaskTypes'; 
// import { findChildTasks, findParentTasks, todayFormatted, tomorrowFormatted } from '../../helpers/taskHelpers';
import { isSelectedDate } from '../../helpers/dateHelpers';
import { TagProps } from '../types/TagTypes';

export type Action =
  | { type: 'INITIALIZE'; payload: TaskInterface[] }
  | { type: 'TOGGLE_COMPLETED'; id: number }
  | { type: 'TOGGLE_SCOPE'; id: number; selectedDate: string }
  | { type: 'DELETE_TASK'; id: number }
  | { type: 'ADD_LIST_TAG'; payload: any }
  | { type: 'PUSH_DAY'; id: number }

//   const updateCompletedStatus = (
//     state: TaskInterface[],
//     actionId: number
// ): TaskInterface[] => {
//     const taskForCompleted = state.find((task) => task.id === actionId);
//     if (!taskForCompleted) {
//         return state;
//     }
//     const descendantsCompleted = findChildTasks(actionId, state);
//     const ancestorsCompleted = findParentTasks(actionId, state);
//     const siblingsCompleted = taskForCompleted.parentId 
//         ? state.filter(task => task.parentId === taskForCompleted.parentId) 
//         : [];
//     const newCompletedStatus = taskForCompleted.completed ? null : new Date().toISOString();
//     return state.map((task) => {
//         if (task.id === actionId || descendantsCompleted.some(descendant => descendant.id === task.id)) {
//             return { ...task, completed: newCompletedStatus };
//         }
//         if (newCompletedStatus && siblingsCompleted.every(sibling => sibling.completed) && taskForCompleted.parentId === task.parentId) {
//             return { ...task, completed: newCompletedStatus };
//         }
//         if (!newCompletedStatus && ancestorsCompleted.some(ancestor => ancestor.id === task.id)) {
//             return { ...task, completed: newCompletedStatus };
//         }
//         return task;
//     });
// };

export const taskReducer = (state: TaskInterface[], action: Action): TaskInterface[] => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload;
    // case 'TOGGLE_COMPLETED':
    //   return updateCompletedStatus(state, action.id);
    // case 'DELETE_TASK': {
    //   const childTasks = findChildTasks(action.id, state);
    //   const allChildIds = childTasks.map(task => task.id);
    //   return state.filter(task => task.id !== action.id && !allChildIds.includes(task.id));
    // }
    default:
      return state;
  }
};
