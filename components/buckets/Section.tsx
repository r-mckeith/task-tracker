import React from "react";
import { View, StyleSheet } from "react-native";
import { TagProps } from "../../src/types/TagTypes";
import Tag from "./Tag";
import AddTag from "./AddTag";

type SectionProps = {
  tags: TagProps[];
  sectionName: string;
};

export default function Section({ tags, sectionName }: SectionProps) {
  return (
    <View style={[styles.section, { borderColor: 'black', backgroundColor: '#FFF' }]}>
      {/* {sectionName === 'today' && <AddTag sectionName={sectionName}/>} */}
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag} sectionName={sectionName} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexShrink: 1,
    flexGrow: 1,
    minHeight: 150,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 8,
    borderWidth: 2,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});
