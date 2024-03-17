import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTagContext } from '../../src/contexts/tags/UseTagContext';
import { TagProps } from "../../src/types/TagTypes";
import { deleteTag, selectTag } from "../../src/api/SupabaseTags";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";
import { useDateContext } from "../../src/contexts/date/useDateContext";


type TagComponentProps = {
  tag: TagProps;
  onSelect?: () => void;
}

export default function Tag({ tag, onSelect }: TagComponentProps) {
  const { dispatch } = useTagContext();
  const { tagData, dispatch: tagDataDispatch } = useTagDataContext();
  const { selectedDate } = useDateContext();



  async function handleDeleteTag(id: number) {
    try {
      await deleteTag(id);
      dispatch.tags({ type: 'DELETE_TAG', id });
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  const handleSelectTag = async (selectedTag: TagProps) => {
    try {
        const updatedTagData = await selectTag(selectedTag, selectedDate);
        tagDataDispatch({ type: 'UPDATE_TAG_DATA', payload: updatedTagData });
    } catch (error) {
        console.error('Error selecting tag:', error);
    }
  };

  return (
    <View style={styles.tag}>
      <TouchableOpacity onPress={() => handleDeleteTag(tag.id)} style={styles.x}>
        <Text>X</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectTag(tag)} style={styles.tagText}>
        <Text>{tag.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#FFF',
    margin: 4,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#000',
  },
  tagText: {
    // flex: 1,
  },
  x: {
    marginRight: 8,
  },
});

