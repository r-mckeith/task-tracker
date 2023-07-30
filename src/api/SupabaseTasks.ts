import { NewTask } from '../types/TaskTypes'
import { supabase } from './SupabaseClient'

export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }

  return data || [];
};

export const addTask = async (task: NewTask) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
};

export const editTask = async (taskId: number, updatedFields: Partial<NewTask>) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updatedFields)
    .eq('id', taskId);

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
};

export const deleteTask = async (taskId: number) => {
  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
};
