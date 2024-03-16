import React from "react";
import { View, Text, StyleSheet } from "react-native"; // Import Text from 'react-native'
import { TagProps } from "../../src/types/TagTypes";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";
import { selectTag } from "../../src/api/SupabaseTags";
import Tag from "./Tag";
import AddTag from "./AddTag";

type SectionProps = {
  color: string;
  tags: TagProps[];
  sectionName: string;
};

export default function Section({ tags, sectionName }: SectionProps) {
  console.log(tags)
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
    <View style={[styles.section, { borderColor: 'black', backgroundColor: '#FFF' }]}>
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
    borderWidth: 2, // Add borderWidth for the outline
    // borderColor and backgroundColor are dynamically set in the component
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  title: { // Style for the section title
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10, // Add some space below the title
  },
});
