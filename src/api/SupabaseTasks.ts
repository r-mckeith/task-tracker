import { NewTask } from '../types/TaskTypes'
import { supabase } from './SupabaseClient'
import { TaskInterface } from '../types/TaskTypes';
import { findChildTasks, findParentTasks, todayFormatted, tomorrowFormatted } from '../../helpers/taskHelpers';

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


export const toggleCompleted = async (id: number, currentScope: Date | null, tasks: TaskInterface[] = []) => {
  const updateCompletionStatus = async (taskId: number, completionDate: Date | null) => {
    const { data: currentTask, error } = await supabase
      .from('tasks')
      .select("completed")
      .eq('id', taskId)
      .single();

    if (error) {
      console.error(error);
    }

    if (currentTask && currentTask.completed !== completionDate) {
      await supabase
        .from('tasks')
        .update({ completed: completionDate })
        .eq('id', taskId);
    }
  };

  const completionDate = currentScope ? null : new Date();

  const childTasks = findChildTasks(id, tasks);
  for (let task of childTasks) {
    await updateCompletionStatus(task.id, completionDate);
  }

  const parentTasks = findParentTasks(id, tasks);
  for (let task of parentTasks) {
    await updateCompletionStatus(task.id, completionDate);
  }

  await updateCompletionStatus(id, completionDate);
};


export const toggleScopeForDay = async (id: number, currentScope: Date | string | null, tasks: TaskInterface[] = []) => {
  
  const childTasks = findChildTasks(id, tasks);
  //const parentTasks = findParentTasks(id, tasks);

  const updatedValues = currentScope 
    ? { inScopeDay: null, unScoped: todayFormatted }
    : { inScopeDay: todayFormatted };

  for (let task of childTasks) {
    await supabase
      .from('tasks')
      .update(updatedValues)
      .eq('id', task.id);
  }

  /*for (let task of parentTasks) {
    await supabase
      .from('tasks')
      .update(updatedValues)
      .eq('id', task.id);
  }

  await supabase
    .from('tasks')
    .update(updatedValues)
    .eq('id', id);*/
};


export const toggleScopeForWeek = async (id: number, currentScope: Date | string | null, tasks: TaskInterface[] = []) => {
  const childTasks = findChildTasks(id, tasks);
  //const parentTasks = findParentTasks(id, tasks);

  for (let task of childTasks) {
    await supabase
      .from('tasks')
      .update({ inScopeWeek: currentScope ? null : new Date() })
      .eq('id', task.id);
  }

  /*for (let task of parentTasks) {
    await supabase
      .from('tasks')
      .update({ inScopeWeek: currentScope ? null : new Date() })
      .eq('id', task.id);
  }

  await supabase
    .from('tasks')
    .update({ inScopeWeek: currentScope ? null : new Date() })
    .eq('id', id);*/
};

export const pushDay = async (id: number) => {

  const { data: taskData, error: taskError } = await supabase
    .from('tasks')
    .update({ 
      inScopeDay: tomorrowFormatted,
      pushed: todayFormatted
    })
    .eq('id', id);

  if (taskError) {
    console.error(taskError);
  }
}
