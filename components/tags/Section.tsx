import React from "react";
import { supabase } from "../../src/api/SupabaseClient";
import { View, StyleSheet } from "react-native";
import { TagProps, TagDataProps } from "../../src/types/TagTypes";
import { Action } from "../../src/reducers/TagDataReducer";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";
import { selectTag } from "../../src/api/SupabaseTags";
import Tag from "./Tag";
import AddTag from "./AddTag";

type SectionProps = {
  color: string;
  tags: TagProps[];
  sectionName: string;
};

export default function Section({ color, tags, sectionName }: SectionProps) {
  const { tagData, dispatch } = useTagDataContext();

  const handleSelectTag = async (selectedTag: TagProps, supabase: any, tagData: TagDataProps[], dispatch: React.Dispatch<Action>) => {
    const existingTagData = tagData.find((item) => item.tag_id === selectedTag.id);

    if (existingTagData) {
        const updatedCount = existingTagData.count + 1;

        try {
            const { data: updatedData, error: updateError } = await supabase
                .from('tag_data')
                .update({ count: updatedCount })
                .eq('tag_id', existingTagData.tag_id)
                .select();

            if (updateError) {
                console.error('Update error:', updateError);
                throw new Error('Failed to update tag data count');
            }

            if (!updatedData || updatedData.length === 0) {
                throw new Error('No data returned after update operation');
            } else {
                dispatch({ type: 'UPDATE_TAG_DATA', payload: updatedData[0] });
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        const newTagData: Partial<TagDataProps> = {
            tag_id: selectedTag.id,
            count: 1,
            tag_name: selectedTag.name
        };

        try {
            const { data: insertedData, error: insertError } = await supabase
                .from('tag_data')
                .insert([newTagData])
                .select();

            if (insertError) {
                console.error(insertError);
                throw new Error('Failed to insert tag data');
            }

            if (!insertedData || insertedData.length === 0) {
                throw new Error('No data returned after insert operation');
            } else {
                dispatch({ type: 'UPDATE_TAG_DATA', payload: insertedData[0] });
            }
        } catch (error) {
            console.error(error);
        }
    }
};

  
  

  return (
    <View style={[styles.section, { backgroundColor: color }]}>
      <AddTag sectionName={sectionName}/>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          // <Tag key={index} tag={tag} onSelect={() => handleSelectTag(tag, supabase)} />
          <Tag key={index} tag={tag} onSelect={() => handleSelectTag(tag, supabase, tagData, dispatch)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    minHeight: 150,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});
