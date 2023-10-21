import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tag from "./Tag";

type SectionProps = {
  color: string;
  tags: string[];
  title: string;
  addTag: () => void;
};

export default function Section({ color, tags, title, addTag }: SectionProps) {
  function handleTagSelect (tag: string) {
  };

  function removeTag (color: string, tag: string) {
    switch (color) {
      //...similar logic for removal
    }
  };

  return (
    <View style={[styles.section, { backgroundColor: color }]}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={addTag}>
            <MaterialCommunityIcons name="plus-circle-outline" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Tag 
            key={index} 
            text={tag}
            onRemove={() => removeTag(color, tag)} 
            onSelect={() => handleTagSelect(tag)}
          />
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
});
