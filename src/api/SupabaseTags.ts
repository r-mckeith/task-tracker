import { NewTagProps, TagProps } from '../types/TagTypes';
import { supabase } from './SupabaseClient'

interface TagResponse {

}

export async function getTags () {
  const { data, error } = await supabase
    .from('tags')
    .select('*')

  if (error) {
    console.error(error);
  }
  return data || [];
};

export async function addTag(newTag: NewTagProps): Promise<TagProps> {
  let { data: tagData, error: tagError } = await supabase
    .from('tags')
    .insert([newTag])
    .select();

  if (tagError) {
    console.error(tagError);
    throw new Error('Failed to add tag');
  }

  if (!tagData) {
    throw new Error('No data returned after insert operation');
  } else {
    return tagData[0];
  }
}

// export async function editTag (noteId: number, updatedFields: Partial<NewNote>) {
//   const { data, error } = await supabase
//     .from('notes')
//     .update(updatedFields)
//     .eq('id', noteId);

//   if (error) {
//     console.error(error);
//   }
// };

export async function deleteTag (tagId: number) {
  const { data, error } = await supabase
    .from('tags')
    .delete()
    .eq('id', tagId);

  if (error) {
    console.error(error);
  }
};