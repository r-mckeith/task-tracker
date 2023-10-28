import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTagContext } from '../../src/contexts/tags/UseTagContext';
import { TagProps } from "../../src/types/TagTypes";
import { deleteTag } from "../../src/api/SupabaseTags";
import { TAG_BACKGROUND } from "../../src/utils/colors";

type TagComponentProps = {
  tag: TagProps;
  onSelect: () => void;
}

export default function Tag({ tag, onSelect }: TagComponentProps) {
  const { dispatch } = useTagContext();

  async function handleDeleteTag(id: number) {
    console.log('deleting tag')
    try {
      await deleteTag(id);
      dispatch({ type: 'DELETE_TAG', id });
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <View style={styles.tag}>
      <TouchableOpacity onPress={() => handleDeleteTag(tag.id)} style={styles.x}>
        <Text>X</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect()} style={styles.tagText}>
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
    backgroundColor: TAG_BACKGROUND,
    margin: 4,
    alignSelf: 'flex-start'
  },
  tagText: {
    flex: 1, // Take up available space
  },
  x: {
    marginRight: 8,
  },
});

