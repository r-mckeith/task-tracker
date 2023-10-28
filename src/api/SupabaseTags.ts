import { NewTagProps, TagProps } from '../types/TagTypes';
import { supabase } from './SupabaseClient'

export const getTags = async () => {
  const today = new Date()
  const todayFormatted = today.toISOString().split('T')[0];
  const startDate = todayFormatted + "T00:00:00.000Z";  // Start of the day
  const endDate = todayFormatted + "T23:59:59.999Z";   // End of the day
  const { data, error } = await supabase
  .from('tags')
  .select(`
      *,
      tag_data (created_at, tag_id)
  `)
  .filter('tag_data.created_at', 'gte', startDate)
  .filter('tag_data.created_at', 'lte', endDate)
  .order('id', { ascending: true });


  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  return data;
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