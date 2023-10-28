import { NewTagProps, TagProps, TagDataProps } from '../types/TagTypes';
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
      tag_data (created_at, tag_id, count)
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

export async function selectTag(id: number): Promise<TagDataProps> {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  const startDate = todayFormatted + "T00:00:00.000Z";  // Start of the day
  const endDate = todayFormatted + "T23:59:59.999Z";   // End of the day

  // Check if tag_data for the tagId with today's date exists
  const { data, error } = await supabase
      .from('tag_data')
      .select('*')
      .eq('tag_id', id)
      .gte('created_at', startDate)
      .lte('created_at', endDate);

  if (error) {
      console.error(error);
      throw new Error('Failed to select tag data');
  }

  // If exists, increment the count. If not, insert new row.
  if (data && data.length > 0) {
      const currentCount = data[0].count;
      const updatedCount = currentCount + 1;

      const { data: updatedData, error: updateError } = await supabase
          .from('tag_data')
          .update({ count: updatedCount })
          .eq('id', data[0].id)
          .select();

      if (updateError) {
          console.error(updateError);
          throw new Error('Failed to update tag data count');
      }

      if (!updatedData) {
        throw new Error('Updated data is not available.');
    }
      
      return updatedData[0];

  } else {
      const newData: Partial<TagDataProps> = {
          tag_id: id,
          count: 1
      };

      const { data: insertedData, error: insertError } = await supabase
          .from('tag_data')
          .insert([newData])
          .single();

      if (insertError) {
          console.error(insertError);
          throw new Error('Failed to insert tag data');
      }

      return insertedData;
  }
}
