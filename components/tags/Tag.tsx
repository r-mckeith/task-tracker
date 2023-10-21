import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TAG_BACKGROUND } from "../../src/utils/colors";

type TagProps = {
  text: string;
  onRemove: () => void;
  onSelect: () => void;
};

export default function Tag({ text, onRemove, onSelect }: TagProps) {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.tag}>
      <Text onPress={onRemove} style={styles.x}>
        X
      </Text>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: TAG_BACKGROUND,
    margin: 4,
    alignSelf: 'flex-start'
  },
  x: {
    marginRight: 8,
  },
});
