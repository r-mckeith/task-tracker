import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Tag from "./Tag";

type SectionProps = {
  color: string;
  tags: string[];
  title: string;
  addTag: () => void;
  onSelect: (tag: string) => void;
  onRemove: (tag: string, color: string) => void;
};

export default function Section({ color, tags, title, addTag, onSelect, onRemove }: SectionProps) {
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
            color={color}
            onRemove={() => onRemove(color, tag)} 
            onSelect={() => onSelect(tag)}
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
