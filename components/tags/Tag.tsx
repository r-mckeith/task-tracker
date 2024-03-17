import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';
import { useTagContext } from '../../src/contexts/tags/UseTagContext';
import { TagProps } from "../../src/types/TagTypes";
import { deleteTag, selectTag } from "../../src/api/SupabaseTags";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import RightSwipe from "./RightSwipe";
import { handleToggleCompleted } from "../../helpers/taskHelpers";
import { useTaskContext } from "../../src/contexts/tasks/UseTaskContext";

type TagComponent = {
  tag: TagProps;
  sectionName: string;
}

export default function Tag({ tag, sectionName }: TagComponent) {
  const [isSelected, setIsSelected] = useState(false);

  const { dispatch: tagDispatch } = useTagContext();
  const { dispatch: tagDataDispatch } = useTagDataContext();
  const { dispatch: taskDispatch } = useTaskContext();
  const { selectedDate } = useDateContext();

  const swipeableRow = useRef<Swipeable | null>(null);

  useEffect(() => {
    if (sectionName === 'today' && tag.completed && tag.completed <= selectedDate.toISOString().split('T')[0]) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, []);

  async function handleDeleteTag(id: number) {
    try {
      await deleteTag(id);
      tagDispatch.tags({ type: 'DELETE_TAG', id });
    } catch (error) {
      console.error('Failed to delete tag:', error);
    }
  };

  const handleSelectTag = async (selectedTag: TagProps) => {
    if (sectionName === 'today') {
      setIsSelected(!isSelected)
      handleToggleCompleted(tag.id, selectedDate, taskDispatch)
    } else {
      try {
        setIsSelected(true);
        const updatedTagData = await selectTag(selectedTag, selectedDate);
        tagDataDispatch({ type: 'UPDATE_TAG_DATA', payload: updatedTagData });
        setTimeout( () => setIsSelected(false), 1);
      } catch (error) {
        console.error('Error selecting tag:', error);
        setIsSelected(false);
      }
    }
  };

  const tagStyle = isSelected ? [styles.tag, styles.selectedTag] : styles.tag;


  return (
    <Swipeable ref={swipeableRow} renderRightActions={() => <RightSwipe handleDelete={handleDeleteTag} id={tag.id} swipeableRow={swipeableRow} />} overshootLeft={false} rightThreshold={20}>
      <View style={tagStyle}>
        {/* <TouchableOpacity onPress={() => handleDeleteTag(tag.id)} style={styles.x}>
          <Text>X</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => handleSelectTag(tag)} style={styles.tagText}>
          <Text>{tag.name}</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>

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
  selectedTag: {
    backgroundColor: '#DDDDDD',
  },
  x: {
    marginRight: 8,
  },
});

