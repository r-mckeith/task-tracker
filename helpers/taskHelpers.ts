import { deleteTask, toggleCompleted } from '../src/api/SupabaseTasks';

export const handleDelete = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    await deleteTask(id);
    dispatch({ type: 'DELETE_TASK', id });
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};