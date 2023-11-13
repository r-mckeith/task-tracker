import { NewTagProps, TagProps, TagDataProps, DateRange } from '../types/TagTypes';
import { supabase } from './SupabaseClient'

export const getTags = async () => {
  const { data, error } = await supabase
    .from('tags')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const tags = data || [];

  return tags;
};

export const getTagData = async (range: DateRange) => {
  let startDate: string;
  let endDate: string;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  switch (range) {
    case DateRange.Today:
      const todayFormatted = today.toISOString().split('T')[0];
      startDate = todayFormatted + "T00:00:00.000Z";
      endDate = todayFormatted + "T23:59:59.999Z";
      break;
    case DateRange.ThisWeek:
      const oneWeekAgo = new Date(today);
      oneWeekAgo.setDate(currentDay - 6);
      startDate = oneWeekAgo.toISOString();
      endDate = today.toISOString();
      break;
    case DateRange.ThisMonth:
      startDate = new Date(currentYear, currentMonth, 1).toISOString();
      endDate = today.toISOString();
      break;
    case DateRange.ThisYear:
      startDate = new Date(currentYear, 0, 1).toISOString();
      endDate = today.toISOString();
      break;
  }

  const { data, error } = await supabase
    .from('tag_data')
    .select('created_at, tag_id, count')
    .filter('created_at', 'gte', startDate)
    .filter('created_at', 'lte', endDate)
    .order('created_at', { ascending: true })
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const tagData = data || [];

  return tagData;
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

// export async function selectTag(id: number): Promise<TagDataProps> {
//   const today = new Date();
//   const todayFormatted = today.toISOString().split('T')[0];
//   const startDate = todayFormatted + "T00:00:00.000Z";  // Start of the day
//   const endDate = todayFormatted + "T23:59:59.999Z";   // End of the day

//   // Check if tag_data for the tagId with today's date exists
//   const { data, error } = await supabase
//       .from('tag_data')
//       .select('*')
//       .eq('tag_id', id)
//       .gte('created_at', startDate)
//       .lte('created_at', endDate);

//   if (error) {
//       console.error(error);
//       throw new Error('Failed to select tag data');
//   }

//   // If exists, increment the count. If not, insert new row.
//   if (data && data.length > 0) {
//       const currentCount = data[0].count;
//       const updatedCount = currentCount + 1;

//       const { data: updatedData, error: updateError } = await supabase
//           .from('tag_data')
//           .update({ count: updatedCount })
//           .eq('id', data[0].id)
//           .select();

//       if (updateError) {
//           console.error(updateError);
//           throw new Error('Failed to update tag data count');
//       }

//       if (!updatedData) {
//         throw new Error('Updated data is not available.');
//     }
      
//       return updatedData[0];

//   } else {
//       const newData: Partial<TagDataProps> = {
//           tag_id: id,
//           count: 1,
//       };

//       const { data: insertedData, error: insertError } = await supabase
//           .from('tag_data')
//           .insert([newData])
//           .single();

//       if (insertError) {
//           console.error(insertError);
//           throw new Error('Failed to insert tag data');
//       }

//       return insertedData;
//   }
// }

// export async function updateOrInsertTagData(selectedTagId: number, currentCount: number): Promise<TagDataProps> {
//   const existingTagData = await selectTag(selectedTagId);

//   if (existingTagData) {
//       // Update existing tag data
//       const updatedCount = existingTagData.count + 1;
//       const { data: updatedData, error: updateError } = await supabase
//           .from('tag_data')
//           .update({ count: updatedCount })
//           .eq('id', existingTagData.tag_id)
//           .select();

//       if (updateError) {
//           console.error(updateError);
//           throw new Error('Failed to update tag data count');
//       }

//       return updatedData[0];

//   } else {
//       // Insert new tag data
//       const newTagData: Partial<TagDataProps> = {
//           tag_id: selectedTagId,
//           count: currentCount,
//           name: 
//       };

//       const { data: insertedData, error: insertError } = await supabase
//           .from('tag_data')
//           .insert([newTagData])
//           .single();

//       if (insertError) {
//           console.error(insertError);
//           throw new Error('Failed to insert tag data');
//       }

//       return insertedData;
//   }
// }

export async function selectTag(tag: TagProps): Promise<TagDataProps> {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  const startDate = todayFormatted + "T00:00:00.000Z";  // Start of the day
  const endDate = todayFormatted + "T23:59:59.999Z";   // End of the day

  // Check if tag_data for the tagId with today's date exists
  const { data, error } = await supabase
      .from('tag_data')
      .select('*')
      .eq('tag_id', tag.id)
      .gte('created_at', startDate)
      .lte('created_at', endDate);

  if (error) {
      console.error(error);
      throw new Error('Failed to select tag data');
  }

  if (data && data.length > 0) {
      // Tag data exists, update the count
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
      // Tag data doesn't exist, insert a new row
      const newData: Partial<TagDataProps> = {
          tag_id: tag.id,
          count: 1,
          tag_name: tag.name
      };

      const { data: insertedData, error: insertError } = await supabase
          .from('tag_data')
          .insert([newData])
          .select();
          console.log("insertedData", insertedData)

      if (insertError) {
          console.error(insertError);
          throw new Error('Failed to insert tag data');
      }

      return insertedData[0];
  }
}


