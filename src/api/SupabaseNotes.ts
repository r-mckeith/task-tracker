import { NewNote } from '../types/NoteTypes'
import { supabase } from './SupabaseClient'

export const getNotes = async () => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')

  if (error) {
    console.error(error);
  }

  return data || [];
};

export const addNote = async (note: NewNote) => {
  console.log(note)
  const { data, error } = await supabase
    .from('notes')
    .insert([note])

  if (error) {
    console.error(error);
  }
};

export const editNote = async (noteId: number, updatedFields: Partial<NewNote>) => {
  const { data, error } = await supabase
    .from('notes')
    .update(updatedFields)
    .eq('id', noteId);

  if (error) {
    console.error(error);
  }
};

export const deleteNote = async (noteId: number) => {
  const { data, error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId);

  if (error) {
    console.error(error);
  }
};
