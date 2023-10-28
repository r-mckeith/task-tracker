import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NewTagProps, TagProps } from "../../src/types/TagTypes";
import { useTagContext } from '../../src/contexts/tags/UseTagContext';
import { addTag } from "../../src/api/SupabaseTags";
import AddTagModal from "./AddTagModal";

type AddTagProps = {
  sectionName: string;
};

export default function AddTag({ sectionName }: AddTagProps) {
  const [showModal, setShowModal] = useState(false);

  const { dispatch } = useTagContext();

  const handleAddTag = async (name: string, section: string): Promise<void> => {
    const newTag: NewTagProps = {
        name: name,
        section: section
    };

    try {
        const createdTag = await addTag(newTag);
        console.log(newTag)
        dispatch({ type: 'ADD_TAG', payload: createdTag });
    } catch (error) {
        console.error('Failed to add tag:', error);
    }
};
  
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}></Text>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <MaterialCommunityIcons name="plus-circle-outline" size={24} />
      </TouchableOpacity>
      <AddTagModal visible={showModal} onClose={() => setShowModal(false)} onAddTag={handleAddTag} sectionName={sectionName} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
