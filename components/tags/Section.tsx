import React from "react";
import { View, StyleSheet } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import Tag from "./Tag";
import AddTag from "./AddTag";

type SectionProps = {
  color: string;
  tags: TagProps[];
  sectionName: string;
  onSelect: (tag: string) => void;
};

export default function Section({ color, tags, sectionName, onSelect }: SectionProps) {
  return (
    <View style={[styles.section, { backgroundColor: color }]}>
      <AddTag sectionName={sectionName}/>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} onSelect={() => onSelect(tag.name)} />
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
});
