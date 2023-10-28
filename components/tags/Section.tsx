import React from "react";
import { View, StyleSheet } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import Tag from "./Tag";
import AddTag from "./AddTag";

type SectionProps = {
  color: string;
  tags: TagProps[];
  sectionName: string;
};

function handleSelectTag(tag: string) {
  // setSelectedTagList((prev) => {
  //   const foundTag = prev.find((t) => t.name === tag);
  //   if (foundTag) {
  //     return prev.map((t) =>
  //       t.name === tag ? { ...t, count: t.count + 1 } : t
  //     );
  //   } else {
  //     return [...prev, { name: tag, count: 1 }];
  //   }
  // });
}; 

export default function Section({ color, tags, sectionName }: SectionProps) {
  return (
    <View style={[styles.section, { backgroundColor: color }]}>
      <AddTag sectionName={sectionName}/>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} onSelect={() => handleSelectTag(tag.name)} />
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
