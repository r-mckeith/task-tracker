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

  const handleSelectTag = async (selectedTag: TagProps) => {
    try {
        const updatedTagData = await selectTag(selectedTag);
        dispatch({ type: 'UPDATE_TAG_DATA', payload: updatedTagData });
    } catch (error) {
        console.error('Error selecting tag:', error);
    }
  };

  return (
    <View style={[styles.section, { backgroundColor: color }]}>
      <AddTag sectionName={sectionName}/>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} onSelect={() => handleSelectTag(tag)} />

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
