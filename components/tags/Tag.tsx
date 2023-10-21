import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TAG_BACKGROUND } from "../../src/utils/colors";

type TagProps = {
  text: string;
  color: string;
  onRemove: (color: string, tag: string) => void;
  onSelect: () => void;
};

export default function Tag({ text, color, onRemove, onSelect }: TagProps) {
  const handleRemove = () => {
    onRemove(color, text);
  };
  
  return (
    <TouchableOpacity onPress={() => onSelect()} style={styles.tag}>
      <Text onPress={() => onRemove(color, text)} style={styles.x}>
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
