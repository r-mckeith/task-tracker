import { addDays } from 'date-fns';
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

export async function addTask(newTask: NewTask): Promise<TaskInterface> {
  let { data: taskData, error: taskError } = await supabase
    .from('tasks')
    .insert([newTask])
    .select();

  if (taskError) {
    console.error(taskError);
    throw new Error('Failed to add task');
  }

  if (!taskData) {
    throw new Error('No data returned after insert operation');
  } else {
    return taskData[0];
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
      .from('tasks')
      .update({ inScopeDay: newScope ? new Date() : null })
      .eq('id', task.id);
  }

  for (let task of parentTasks) {
    await supabase
      .from('tasks')
      .update({ inScopeDay: newScope ? new Date() : null })
      .eq('id', task.id);
  }

  await supabase
    .from('tasks')
    .update({ inScopeDay: newScope ? new Date() : null })
    .eq('id', id);
};

export const toggleScopeForWeek = async (id: number, newScope: boolean, tasks: TaskInterface[] = []) => {
  const childTasks = findChildTasks(id, tasks);
  const parentTasks = findParentTasks(id, tasks);

  for (let task of childTasks) {
    await supabase
      .from('tasks')
      .update({ inScopeWeek: newScope ? new Date() : null })
      .eq('id', task.id);
  }

  for (let task of parentTasks) {
    await supabase
      .from('tasks')
      .update({ inScopeWeek: newScope ? new Date() : null })
      .eq('id', task.id);
  }

  await supabase
    .from('tasks')
    .update({ inScopeWeek: newScope ? new Date() : null })
    .eq('id', id);
};

export const pushDay = async (id: number) => {
  const tomorrow = addDays(new Date(), 1); // tomorrow's date

  const { data: taskData, error: taskError } = await supabase
    .from('tasks')
    .update({ inScopeDay: tomorrow })
    .eq('id', id);

  const { data: scopeData, error: scopeError } = await supabase
    .from('scopes')
    .insert([
      { taskId: id, inScopeDay: new Date() }
    ]);

  if (taskError) {
    console.error(taskError);
  }

  if (scopeError) {
    console.error(scopeError);
  }
};