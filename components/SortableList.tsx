import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SortableList from 'react-native-sortable-list';

interface Item {
  id: string;
  text: string;
}

const SortableListComponent: React.FC = () => {
  // Sample data for the list
  const [data, setData] = useState<Item[]>([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    // Add more items as needed
  ]);

  // Function to update the order of the list items
  const onRowMoved = (
    e: { from: number; to: number; row: Item } // Define a custom type for the argument
  ) => {
    const newData = [...data];
    newData.splice(e.to, 0, newData.splice(e.from, 1)[0]);
    setData(newData);
  };

  // Render function for each item in the list
  const renderRow = ({ data: row }: { data: Item }) => {
    return (
      <View key={row.id} style={styles.row}>
        <Text>{row.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SortableList
        data={data}
        renderRow={renderRow}
        onChangeOrder={onRowMoved as any}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    backgroundColor: '#EEE',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SortableListComponent;
