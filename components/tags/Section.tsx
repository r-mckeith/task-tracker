import React from "react";
import { View, StyleSheet } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import { useTagContext } from "../../src/contexts/tags/UseTagContext";
import { selectTag } from "../../src/api/SupabaseTags";
import Tag from "./Tag";
import AddTag from "./AddTag";

type SectionProps = {
  color: string;
  tags: TagProps[];
  sectionName: string;
};

export default function Section({ color, tags, sectionName }: SectionProps) {
  const { dispatch } = useTagContext();

  const handleSelectTag = async (tag: TagProps): Promise<void> => {
    try {
      await selectTag(tag.id);
      dispatch({ type: 'SELECT_TAG', payload: tag });
    } catch (error) {
      console.error('Failed to select tag:', error);
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
    minHeight: 150,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
});
