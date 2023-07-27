import { TaskInterface } from '../types/TaskTypes'; 

export type Action =
  | { type: 'TOGGLE_COMPLETED'; id: number }
  | { type: 'ADD_TASK'; task: TaskInterface }
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
    case 'ADD_TASK':
      return [...state, action.task];
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.id);
    default:
      return state;
  }
    //  // Function to delete a task
    //  const deleteTask = (id: number) => {
    //   // This will recursively delete all children tasks
    //   const recursiveDelete = (taskId: number) => {
    //     const childTasks = tasks.filter(task => task.parentId === taskId);
    //     for (let childTask of childTasks) {
    //       recursiveDelete(childTask.id);
    //     }
    //     setTasks(tasks => tasks.filter(task => task.id !== taskId));
    //   };
  
    //   recursiveDelete(id);
    // };
};
