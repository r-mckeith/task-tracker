import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TagProps, TagDataProps, DateRange } from "../../src/types/TagTypes";
import { useDateContext } from "../../src/contexts/date/useDateContext";
import { getTagData } from "../../src/api/SupabaseTags";
import { useTagDataContext } from "../../src/contexts/tagData/UseTagDataContext";

export default function SelectedTagList() {
  const [timeframe, setTimeframe] = useState('day');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTagsList, setSelectedTagsList] = useState<any>([]);

  const { selectedDate } = useDateContext();
  const { tagData } = useTagDataContext();

  const optionToEnumMap: any = {
    'day': DateRange.Today,
    'week': DateRange.ThisWeek,
    'month': DateRange.ThisMonth,
    'year': DateRange.ThisYear,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTagData(optionToEnumMap[timeframe], selectedDate);
        setSelectedTagsList(data);
      } catch (error) {
        console.error('Failed to fetch tag data:', error);
      }
    };

    fetchData();
  }, [selectedDate, timeframe, tagData]);
  
  return (
    <View style={styles.selectedTagList}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Text style={styles.dropdownOption}>{timeframe}</Text>
        <MaterialCommunityIcons name={dropdownVisible ? "chevron-up" : "chevron-down"} size={24} />
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdownList}>
          {['day', 'week', 'month', 'year'].map(option => (
            <TouchableOpacity key={option} style={styles.dropdownItem} onPress={() => { setTimeframe(option); setDropdownVisible(false); }}>
              <Text style={styles.dropdownOption}>{option}</Text>
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
  dropdownOption: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
    // borderWidth: 1,
    // borderColor: 'black',
  },
});
