import { deleteTask, toggleCompleted, toggleScopeForDay, toggleScopeForWeek } from '../src/api/SupabaseTasks';
import { TaskInterface } from '../src/types/TaskTypes';

export const handleDelete = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    await deleteTask(id);
    dispatch({ type: 'DELETE_TASK', id });
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

export const handleToggleCompleted = async (id: number, completed: boolean, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  try {
    await toggleCompleted(id, completed, tasks);

    dispatch({ type: 'TOGGLE_COMPLETED', id });
  } catch (error) {
    console.error('Failed to toggle task:', error);
  }
};

export  const handleToggleScopeforDay = async (id: number, inScope: boolean, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  try {
    await toggleScopeForDay(id, inScope, tasks);

  dispatch({ type: 'TOGGLE_DAY', id: id, inScopeDay: inScope, });
} catch (error) {
  console.error('Failed to toggle scope for day:', error);
}
};

export  const handleToggleScopeforWeek = async (id: number, inScope: boolean, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  try {
    await toggleScopeForWeek(id, inScope, tasks);

  dispatch({ type: 'TOGGLE_WEEK', id: id, inScopeDay: inScope });
} catch (error) {
  console.error('Failed to toggle scope for day:', error);
}
}; 

export const findChildTasks = (taskId: number, tasks: TaskInterface[]): TaskInterface[] => {
  if (!tasks) {
    console.error('Tasks is undefined!');
    return [];
  }
  
  const directChildren = tasks.filter(task => task.parentId === taskId);
  let allChildren = [...directChildren];

  directChildren.forEach(child => {
    const grandchildren = findChildTasks(child.id, tasks);
    allChildren = [...allChildren, ...grandchildren];
  });

  return allChildren;
};

export const findParentTasks = (taskId: number, tasks: TaskInterface[]): TaskInterface[] => {
  const parentTask = tasks.find(task => task.id === taskId);
  return parentTask && parentTask.parentId
    ? [...findParentTasks(parentTask.parentId, tasks), parentTask]
    : [];
};