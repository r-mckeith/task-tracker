import { deleteTask, toggleCompleted, toggleScopeForDay, toggleScopeForWeek, pushDay, addTask } from '../src/api/SupabaseTasks';
import { TaskInterface, NewTask } from '../src/types/TaskTypes';

export const handleDelete = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    await deleteTask(id);
    dispatch({ type: 'DELETE_TASK', id });
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

export const handleAddTask = async (
  newTaskName: string,
  parentId: number,
  depth: number,
  isRecurring: boolean | null = null,
  selectedDays: string | null = null,
  timesPerDay: string | null = null,
  routeName: string,
  dispatch: React.Dispatch<any>
): Promise<boolean> => {
  const currentDate = new Date();
  const newTask: NewTask = {
    name: newTaskName,
    parentId: parentId,
    depth: depth + 1,
    userId: '19ccea07-a8a2-4bde-a768-48bc9e8f775e',
    recurringOptions: {
      isRecurring: isRecurring,
      selectedDays: selectedDays,
      timesPerDay: timesPerDay,
    },
    inScopeQuarter: currentDate,
    inScopeWeek: isRecurring || routeName === 'Week' || routeName === 'Day' ? currentDate : null,
    inScopeDay: isRecurring || routeName === 'Day' ? currentDate : null,
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

export const handleToggleCompleted = async (id: number, completed: boolean, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'TOGGLE_COMPLETED', id });

  try {
    await toggleCompleted(id, completed, tasks);
  } catch (error) {
    console.error('Failed to toggle task:', error);

    dispatch({ type: 'TOGGLE_COMPLETED', id });
  }
};

export const handleToggleScopeforDay = async (id: number, inScope: Date | null, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'TOGGLE_DAY', id: id, inScopeDay: inScope });

  try {
    await toggleScopeForDay(id, inScope, tasks);
  } catch (error) {
    console.error('Failed to toggle scope for day:', error);

    dispatch({ type: 'TOGGLE_DAY', id: id, inScopeDay: !inScope });
  }
};

export const handleToggleScopeforWeek = async (id: number, inScope: Date | null, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'TOGGLE_WEEK', id: id, inScopeWeek: inScope });

  try {
    await toggleScopeForWeek(id, inScope, tasks);
  } catch (error) {
    console.error('Failed to toggle scope for week:', error);

    dispatch({ type: 'TOGGLE_WEEK', id: id, inScopeWeek: !inScope });
  }
};

export const handlePushTaskForDay = async (id: number, completed: boolean, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'PUSH_DAY', id });

  try {
    await pushDay(id);
  } catch (error) {
    console.error('Failed to push task:', error);

    dispatch({ type: 'PUSH_DAY', id });
  }
};

export const handlePushTaskForWeek = async (id: number, completed: boolean, tasks: TaskInterface[], dispatch: React.Dispatch<any>) => {

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