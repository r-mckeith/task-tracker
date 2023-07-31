import { deleteTask, toggleCompleted } from '../src/api/SupabaseTasks';

export const handleDelete = async (id: number, dispatch: React.Dispatch<any>) => {
  try {
    await deleteTask(id);
    dispatch({ type: 'DELETE_TASK', id });
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
};

export const handleToggleCompleted = async (id: number, completed: boolean, dispatch: React.Dispatch<any>) => {
    try {
      await toggleCompleted(id, completed);
  
      dispatch({ type: 'TOGGLE_COMPLETED', id });
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };