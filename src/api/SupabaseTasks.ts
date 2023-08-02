import { NewTask } from '../types/TaskTypes'
import { supabase } from './SupabaseClient'
import { TaskInterface } from '../types/TaskTypes';
import { findChildTasks, findParentTasks } from '../../helpers/taskHelpers';


export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) {
    console.error(error);
  }

  return data || [];
};

export async function addTask(newTask: NewTask): Promise<TaskInterface> {
  const { data, error } = await supabase
    .from('tasks')
    .insert([newTask])
    .select();


  if (error) {
    console.error(error);
    throw new Error('Failed to add task');
  }

  if (!data || data.length === 0) {
    throw new Error('No data returned after insert operation');
  }

  const task: TaskInterface = data[0]; // Extract the task from the data array

  return task;
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

export const toggleCompleted = async (id: number, newCompletedStatus: boolean, tasks: TaskInterface[] = []) => {
  const childTasks = findChildTasks(id, tasks);
  const parentTasks = findParentTasks(id, tasks);

  for (let task of childTasks) {
    await supabase
      .from('tasks')
      .update({ completed: newCompletedStatus })
      .eq('id', task.id);
  }

  for (let task of parentTasks) {
    await supabase
      .from('tasks')
      .update({ completed: newCompletedStatus })
      .eq('id', task.id);
  }

  const { data, error } = await supabase
    .from('tasks')
    .update({ completed: newCompletedStatus })
    .eq('id', id);

  if (error) {
    console.error(error);
  }
};

export const toggleScopeForDay = async (id: number, newScope: boolean, tasks: TaskInterface[] = []) => {
  const childTasks = findChildTasks(id, tasks);
  const parentTasks = findParentTasks(id, tasks);

  for (let task of childTasks) {
    await supabase
      .from('tasks')
      .update({ inScopeDay: newScope })
      .eq('id', task.id);
  }

  for (let task of parentTasks) {
    await supabase
      .from('tasks')
      .update({ inScopeDay: newScope })
      .eq('id', task.id);
  }

  const { data, error } = await supabase
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
      .from('tasks')
      .update({ inScopeWeek: newScope })
      .eq('id', task.id);
  }

  for (let task of parentTasks) {
    await supabase
      .from('tasks')
      .update({ inScopeWeek: newScope })
      .eq('id', task.id);
  }

  const { data, error } = await supabase
    .from('tasks')
    .update({ inScopeWeek: newScope })
    .eq('id', id);

  if (error) {
    console.error(error);
  }
};