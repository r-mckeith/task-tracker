import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

// A helper function to generate a unique ID for new items
const generateID = () => Date.now().toString();

const initialTags = [
  { id: generateID(), text: 'Example Tag 1', children: [] },
  // Add more tags with nested children as needed
];

export default function DynamicTagInput() {
  const [tags, setTags] = useState<any>(initialTags);
  const inputsRef = useRef<any>({});

  const addTagAtIndex = (parentID: any, index: number) => {
    const newTag = {
      id: generateID(),
      text: '',
      children: [],
    };

    // Recursive function to find and update the parent tag to insert the new tag
    const insertNewTag = (tags: any, parentID: any, newTag: any) => {
      return tags.map((tag: any) => {
        if (tag.id === parentID) {
          const newChildren = [...tag.children];
          newChildren.splice(index + 1, 0, newTag); // Insert at the desired position
          return { ...tag, children: newChildren };
        } else if (tag.children.length > 0) {
          return { ...tag, children: insertNewTag(tag.children, parentID, newTag) };
        }
        return tag;
      });
    };

    const newTags = parentID ? insertNewTag(tags, parentID, newTag) : [...tags, newTag];
    setTags(newTags);

    setTimeout(() => inputsRef.current[newTag.id]?.focus(), 100);
  };

  const updateTagText = (id: any, text: string) => {
    const updateText = (tags: any) => {
      return tags.map((tag: any) => {
        if (tag.id === id) {
          return { ...tag, text };
        } else if (tag.children.length > 0) {
          return { ...tag, children: updateText(tag.children) };
        }
        return tag;
      });
    };

    setTags(updateText(tags));
  };

  const renderTagInput = ({ item, level = 0 }: any) => {
    return (
      <View style={{ marginLeft: level * 20 }}>
        <TextInput
          ref={(el) => (inputsRef.current[item.id] = el)}
          style={styles.input}
          value={item.text}
          onChangeText={(text) => updateTagText(item.id, text)}
          onSubmitEditing={() => addTagAtIndex(item.id, item.children.length)}
          blurOnSubmit={false}
          returnKeyType="next"
        />
        {item && item.children && item.children.length > 0 && (
          <FlatList
            data={item.children}
            renderItem={({ item: childItem }) => renderTagInput({ item: childItem, level: level + 1 })}
            keyExtractor={(childItem) => childItem.id}
            // listKey={item.id}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => addTagAtIndex(null, tags.length)} style={styles.addButton}>
        <Text>Add Root Tag</Text>
      </TouchableOpacity>
      <FlatList
        data={tags}
        renderItem={({ item }) => renderTagInput({ item })}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 16,
    marginVertical: 5,
  },
  addButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
});
