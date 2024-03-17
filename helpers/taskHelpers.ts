import addDays from 'date-fns/addDays';
import { deleteTask, markTaskAsComplete, toggleScopeForDay, toggleScopeForWeek, pushDay, addTask } from '../src/api/SupabaseTasks';
import { TaskInterface, NewTask } from '../src/types/TaskTypes';

export const handleDelete = async (id: number, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  try {
    await deleteTask(id, tasks);
    dispatch({ type: 'DELETE_TASK', id });
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

export const handleAddTask = async (
  newTaskName: string,
  userId: string | null,
  parentId: number,
  depth: number,
  dispatch: React.Dispatch<any>
): Promise<boolean> => {

  if (!userId) {
    throw new Error("User's ID is not available.");
  }
  
  const newTask: NewTask = {
    name: newTaskName,
    parentId: parentId,
    depth: depth + 1,
    user_id: userId,
  };

  try {
    const createdTask = await addTask(newTask);
    dispatch({ type: 'ADD_TASK', payload: createdTask });
    return true;
  } catch (error) {
    console.error('Failed to add task:', error);
    return false;
  }
};

export const handleToggleCompleted = async (id: number, selectedDate: Date, dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'TOGGLE_COMPLETED', id });

  try {
    await markTaskAsComplete(id, selectedDate);
  } catch (error) {
    console.error('Failed to toggle task:', error);

    dispatch({ type: 'TOGGLE_COMPLETED', id });
  }
};

export const handleToggleScopeforDay = async (id: number, inScope: Date | string | null, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'TOGGLE_DAY', id: id, inScopeDay: inScope });

  try {
    await toggleScopeForDay(id, inScope, tasks);
  } catch (error) {
    console.error('Failed to toggle scope for day:', error);

    dispatch({ type: 'TOGGLE_DAY', id: id, inScopeDay: !inScope });
  }
};

export const handleToggleScopeforWeek = async (id: number, inScope: Date | string | null, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'TOGGLE_WEEK', id: id, inScopeWeek: inScope });

  try {
    await toggleScopeForWeek(id, inScope, tasks);
  } catch (error) {
    console.error('Failed to toggle scope for week:', error);

    dispatch({ type: 'TOGGLE_WEEK', id: id, inScopeWeek: !inScope });
  }
};

export const handlePushTaskForDay = async (id: number, completed: Date | null, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'PUSH_DAY', id });

  try {
    await pushDay(id);
  } catch (error) {
    console.error('Failed to push task:', error);

    dispatch({ type: 'PUSH_DAY', id });
  }
};

export const handlePushTaskForWeek = async (id: number, completed: Date | null, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {

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

export function isRouteNameInScope(routeName: string, scopeRoutes: string[]) {
  return scopeRoutes.includes(routeName);
}

const today = new Date
export const todayFormatted = today.toISOString().split('T')[0];
const tomorrow = addDays(new Date(), 1);
export const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

export function getTaskLevelName (depth: number): "Goal" | "Objective" | "Task" | "Subtask" {
  const newTaskDepth = depth+1;
  switch (newTaskDepth) {
    case 1: 
      return 'Goal';
    case 2:
      return 'Objective';
    case 3:
      return 'Task';
    default:
      return 'Subtask';
  }
}