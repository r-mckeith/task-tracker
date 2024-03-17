import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NewTagProps } from "../../src/types/TagTypes";
import { useTagContext } from '../../src/contexts/tags/UseTagContext';
import { addTag } from "../../src/api/SupabaseTags";
import AddTagModal from "./AddTagModal";

type AddTag = {
  sectionName: string;
};

export default function AddTag({ sectionName }: AddTag) {
  const [showModal, setShowModal] = useState(false);

  const { dispatch } = useTagContext();

  const handleAddTag = async (name: string, section: string): Promise<void> => {
    const newTag: NewTagProps = {
        name: name,
        section: section
    };

    try {
        const createdTag = await addTag(newTag);
        dispatch({ type: 'ADD_TAG', payload: createdTag });
    } catch (error) {
        console.error('Failed to add tag:', error);
    }
};

const toDoSection = sectionName === 'today'
  
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{toDoSection ? 'Today' : sectionName}</Text>
      {!toDoSection && 
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <MaterialCommunityIcons name="plus-circle-outline" size={24} />
        </TouchableOpacity>
      }
      {!toDoSection && <AddTagModal visible={showModal} onClose={() => setShowModal(false)} onAddTag={handleAddTag} sectionName={sectionName} />}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  addButton: {
    position: 'absolute',
    right: 0,
  },

});
