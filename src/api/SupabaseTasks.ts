import { NewTask } from '../types/TaskTypes'
import { supabase } from './SupabaseClient'
import { TaskInterface } from '../types/TaskTypes';
import { findChildTasks, findParentTasks, todayFormatted } from '../../helpers/taskHelpers';

export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Failed to fetch tasks:', error);
  }
  return data || [];
};

export async function addListTag(newTask: NewTask): Promise<TaskInterface> {
  let { data: taskData, error: taskError } = await supabase
    .from('tags')
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

export const deleteTask = async (taskId: number, tasks: TaskInterface[]) => {
  const childTasks = findChildTasks(taskId, tasks);

  const allTaskIdsToDelete = [taskId, ...childTasks.map(task => task.id)];

  const { data, error } = await supabase
    .from('tasks')
    .delete()
    .in('id', allTaskIdsToDelete); 

  if (error) {
    console.error(error);
  }
};

export const markTaskAsComplete = async (taskId: number, completionDate: Date) => {
  const fetchResult = await supabase
    .from('tasks')
    .select('completed')
    .eq('id', taskId)
    .single();

  if (fetchResult.error || !fetchResult.data) {
    console.error('Failed to fetch task:', fetchResult.error);
    throw new Error('Failed to fetch task');
  }

  const task = fetchResult.data;

  const newCompletionDate = task.completed ? null : completionDate;

  const data = await supabase
    .from('tasks')
    .update({ completed: newCompletionDate })
    .eq('id', taskId);

  if (data.error) {
    console.error('Failed to mark task as complete/incomplete:', data.error);
    throw new Error('Failed to update task');
  }

  if (!data) {
        throw new Error('No data returned after insert operation');
      } else {
        return data;
      }
};


// export const markTaskAsComplete = async (taskId: number, completionDate: Date) => {
//   const { data, error } = await supabase
//     .from('tasks')
//     .update({ completed: completionDate.toISOString() })
//     .eq('id', taskId);

//   if (error) {
//     console.error('Failed to mark task as complete:', error);
//     throw new Error('Failed to update task');
//   }

//   if (!data) {
//     throw new Error('No data returned after insert operation');
//   } else {
//     return data[0];
//   }
// }

export const toggleScopeForDay = async (taskId: number, selectedDate: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('inScopeDay')
    .eq('id', taskId)
    .single();

  if (error || !data) {
    console.error('Failed to fetch task:', error);
    throw new Error('Failed to fetch task');
  }

  const newScopeDate = data.inScopeDay ? null : selectedDate;

  const { data: updateData, error: updateError } = await supabase
    .from('tasks')
    .update({ inScopeDay: newScopeDate })
    .eq('id', taskId)
    .select()

  if (updateError) {
    console.error('Failed to toggle scope:', updateError);
    throw new Error('Failed to update task');
  }

  if (!data) {
        throw new Error('No data returned after insert operation');
      } else {
        return updateData;
      }
};


// export const toggleScopeForDay = async (id: number, currentScope: Date | string | null, tasks: TaskInterface[] = []) => {
  
//   const childTasks = findChildTasks(id, tasks);
//   const parentTasks = findParentTasks(id, tasks);

//   const updatedValues = currentScope 
//     ? { inScopeDay: null, unScoped: todayFormatted }
//     : { inScopeDay: todayFormatted };

//   for (let task of childTasks) {
//     await supabase
//       .from('tasks')
//       .update(updatedValues)
//       .eq('id', task.id);
//   }

//   for (let task of parentTasks) {
//     await supabase
//       .from('tasks')
//       .update(updatedValues)
//       .eq('id', task.id);
//   }

//   await supabase
//     .from('tasks')
//     .update(updatedValues)
//     .eq('id', id);
// };
