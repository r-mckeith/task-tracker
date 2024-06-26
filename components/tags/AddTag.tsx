import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NewTagProps } from "../../src/types/TagTypes";
import { useTagContext } from "../../src/contexts/tags/UseTagContext";
import { useGroupContext } from "../../src/contexts/groups/UseGroupContext";
import { addTag } from "../../src/api/SupabaseTags";
import AddTagModal from "./AddTagModal";
import { updateGroupName } from "../../src/api/SupabaseGroups";

type AddTag = {
  sectionName: string;
  groupId: number;
  setIsEditMode: (arg0: boolean) => void;
};

export default function AddTag({ sectionName, groupId, setIsEditMode }: AddTag) {
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const { dispatch: tagDispatch } = useTagContext();
  const { dispatch: groupDispatch } = useGroupContext();

  const handleAddTag = async (name: string, section: string): Promise<void> => {
    const newTag: NewTagProps = {
      name: name,
      section: section,
      group_id: groupId,
    };

    try {
      const createdTag = await addTag(newTag);
      tagDispatch({ type: "ADD_TAG", payload: createdTag });
    } catch (error) {
      console.error("Failed to add tag:", error);
    }
  };

  if (sectionName === "today") return;

  function handleUpdateGroupName() {
    if (newGroupName) {
      groupDispatch({ type: "UPDATE_GROUP_NAME", id: groupId, name: newGroupName})
      updateGroupName(groupId, newGroupName);
      setIsEditMode(false)
    }
  }

  return (
    <View style={styles.sectionHeader}>
      <TextInput
        style={[styles.textInput, styles.input, { marginBottom: 3 }]}
        placeholder={`${sectionName}...`}
        value={newGroupName}
        onChangeText={setNewGroupName}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleUpdateGroupName}
        >
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={24}
            color={"green"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowModal(true)}
      >
        <MaterialCommunityIcons name="plus-circle-outline" size={24} />
      </TouchableOpacity>

      <AddTagModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onAddTag={handleAddTag}
        sectionName={sectionName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    // position: "relative",
    justifyContent: "space-between", // Adjusted for side-by-side layout
    padding: 10, // Add some padding around
  },
  input: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "#bbb",
    marginBottom: -50,
    // paddingHorizontal: 0,
    // paddingVertical: 0,
    // paddingBottom: -100, // You might increase this to push text up
  },
  textInput: {
    flex: 1, // Take up remaining space
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10, // Space between input and button
    paddingHorizontal: 10, // Inner spacing
    // width: '100%',
  },
  addButton: {
    // position: "absolute",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
});
