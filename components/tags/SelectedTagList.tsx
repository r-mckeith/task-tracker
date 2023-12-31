import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TagProps, TagDataProps } from "../../src/types/TagTypes";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";

export default function SelectedTagList() {
  const [timeframe, setTimeframe] = useState('Day');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTagsList, setSelectedTagsList] = useState<any>([]);

  const { tagData } = useTagDataContext();

  useEffect(() => {
    setSelectedTagsList(tagData);
  }, [tagData]);
  
  return (
    <View style={styles.selectedTagList}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Text>{timeframe}</Text>
        <MaterialCommunityIcons name={dropdownVisible ? "chevron-up" : "chevron-down"} size={24} />
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdownList}>
          {['Day', 'Week', 'Month', 'Year'].map(option => (
            <TouchableOpacity key={option} style={styles.dropdownItem} onPress={() => { setTimeframe(option); setDropdownVisible(false); }}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
        <View style={styles.table}></View>
        {selectedTagsList.map((item: any, index: any) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{item.tag_name}</Text>
          <Text style={styles.cell}>{item.count}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  selectedTagList: {
    flex: 1,
    padding: 10,
    minHeight: 250,
    backgroundColor: '#eee',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    margin: 4,
    alignSelf: 'flex-start',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownList: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tagName: {
    marginRight: 8,
    fontSize: 16,
  },
  tagCount: {
      fontSize: 16,
      color: '#555',
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgray',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
});
