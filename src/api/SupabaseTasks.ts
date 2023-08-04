import { NewTask } from '../types/TaskTypes'
import { supabase } from './SupabaseClient'
import { TaskInterface } from '../types/TaskTypes';
import { findChildTasks, findParentTasks } from '../../helpers/taskHelpers';

interface TaskResponse {
  id: bigint;
  created_at: string;
  userId: string;
  name: string;
  parentId: number;
  depth: number;
  recurringOptions: {
    isRecurring: boolean;
    selectedDays: string;
    timesPerDay: string;
  };
}

export const getTasks = async () => {
  const { data, error } = await supabase
  .from('tasks')
  .select(`
      *,
      scopes (*)
  `)
  .order('id', { ascending: true })

  if (error) {
    console.error(error);
  }
  return data || [];
};

export async function addTask(newTask: NewTask, newScope: any): Promise<TaskInterface> {
  let task: TaskResponse;

  let { data: taskData, error: taskError } = await supabase
    .from('tasks')
    .insert([newTask])
    .select();

  if (taskError) {
    console.error(taskError);
    throw new Error('Failed to add task');
  }

  if (!taskData || taskData.length === 0) {
    throw new Error('No data returned after insert operation');
  } else {
    task = taskData[0];
  }

  const taskId: number = Number(task.id);
  const taskUserId: number = Number(task.userId);

  let { data: scopeData, error: scopeError } = await supabase
  .from('scopes')
  .insert([{
    taskId: taskId,
    userId: taskUserId,
    inScopeDay: newScope.inScopeDay ? new Date() : false,
    inScopeWeek: newScope.inScopeWeek ? new Date() : false,
    inScopeQuarter: newScope.inScopeQuarter ? new Date() : false,
  }])
  .select();

  if (scopeError) {
    console.error(scopeError);
    throw new Error('Failed to create scope record');
  }

  if (scopeData && scopeData.length > 0) {
    const completeTask: TaskInterface = { 
      ...task, 
      scope: scopeData[0],  // take the first element from the array
      parentId: newTask.parentId, 
      userId: newTask.userId,
      id: taskId
    };
    return completeTask;
  } else {
    throw new Error('No data returned after scope creation');
  }
}

export const deleteTask = async (taskId: number) => {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) {
    console.error(error);
  }
};

export const toggleCompleted = async (id: number, newStatus: boolean, tasks: TaskInterface[] = []) => {
  const childTasks = findChildTasks(id, tasks);
  const parentTasks = findParentTasks(id, tasks);

  for (let task of childTasks) {
    const { data: currentTask, error } = await supabase
      .from('tasks')
      .select("completed")
      .eq('id', task.id)
      .single();

    if (error) {
      console.error(error);
    }

    if (currentTask && currentTask.completed !== newStatus) {
      await supabase
        .from('scopes')
        .insert([
          { taskId: task.id, completed: newStatus ? new Date() : false }
        ]);
      await supabase
        .from('tasks')
        .update({ completed: newStatus })
        .eq('id', task.id);
    }
  }

  for (let task of parentTasks) {
    const { data: currentTask, error } = await supabase
      .from('tasks')
      .select("completed")
      .eq('id', task.id)
      .single();

    if (error) {
      console.error(error);
    }

    if (currentTask && currentTask.completed !== newStatus) {
      await supabase
        .from('scopes')
        .insert([
          { taskId: task.id, completed: newStatus ? new Date() : false }
        ]);
      await supabase
        .from('tasks')
        .update({ completed: newStatus })
        .eq('id', task.id);
    }
  }

  const { data: currentTask, error } = await supabase
    .from('tasks')
    .select("completed")
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  if (currentTask && currentTask.completed !== newStatus) {
    await supabase
      .from('scopes')
      .insert([
        { taskId: id, completed: newStatus ? new Date() : false }
      ]);

    await supabase
      .from('tasks')
      .update({ completed: newStatus })
      .eq('id', id);
  }
};

export const toggleScopeForDay = async (id: number, newScope: boolean, tasks: TaskInterface[] = []) => {
  const childTasks = findChildTasks(id, tasks);
  const parentTasks = findParentTasks(id, tasks);

  for (let task of childTasks) {
    await supabase
      .from('scopes')
      .insert([
        { taskId: task.id, inScopeDay: newScope ? new Date() : false }
      ]);
    await supabase
      .from('tasks')
      .update({ inScopeDay: newScope })
      .eq('id', task.id);
  }

  for (let task of parentTasks) {
    await supabase
      .from('scopes')
      .insert([
        { taskId: task.id, inScopeDay: newScope ? new Date() : false }
      ]);
    await supabase
      .from('tasks')
      .update({ inScopeDay: newScope })
      .eq('id', task.id);
  }

  const { data, error } = await supabase
    .from('scopes')
    .insert([
      { taskId: id, inScopeDay: newScope ? new Date() : false }
    ]);

  await supabase
    .from('tasks')
    .update({ inScopeDay: newScope })
    .eq('id', id);

  if (error) {
    console.error(error);
  }
};

export const toggleScopeForWeek = async (id: number, newScope: boolean, tasks: TaskInterface[] = []) => {
  const childTasks = findChildTasks(id, tasks);
  const parentTasks = findParentTasks(id, tasks);

  for (let task of childTasks) {
    await supabase
      .from('scopes')
      .insert([
        { taskId: task.id, inScopeWeek: newScope ? new Date() : false }
      ]);
    await supabase
      .from('tasks')
      .update({ inScopeWeek: newScope })
      .eq('id', task.id);
  }

  for (let task of parentTasks) {
    await supabase
      .from('scopes')
      .insert([
        { taskId: task.id, inScopeWeek: newScope ? new Date() : false }
      ]);
    await supabase
      .from('tasks')
      .update({ inScopeWeek: newScope })
      .eq('id', task.id);
  }

  const { data, error } = await supabase
    .from('scopes')
    .insert([
      { taskId: id, inScopeWeek: newScope ? new Date() : false }
    ]);

  await supabase
    .from('tasks')
    .update({ inScopeWeek: newScope })
    .eq('id', id);

  if (error) {
    console.error(error);
  }
};