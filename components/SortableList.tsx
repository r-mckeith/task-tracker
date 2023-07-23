import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SortableList from 'react-native-sortable-list';

// Define a type for the items in the list
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

  // Function to update the order of the list items when an item is moved
  const onRowMoved = (
    e: { from: number; to: number; row: Item } // Define a custom type for the argument
  ) => {
    const newData = [...data]; // Create a new copy of the data array
    newData.splice(e.to, 0, newData.splice(e.from, 1)[0]); // Move the item from 'e.from' to 'e.to' in the newData array
    setData(newData); // Update the state with the new order of the items
  };

  // Render function for each item in the list
  const renderRow = ({ data: row }: { data: Item }) => {
    // This function is called for each item in the 'data' array to render it in the list
    return (
      <View key={row.id} style={styles.row}>
        <Text>{row.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Render the SortableList component */}
      <SortableList
        data={data} // Pass the data array as the list of items
        renderRow={renderRow} // Pass the renderRow function to render each item
        onChangeOrder={onRowMoved as any} // Pass the onRowMoved function to handle item movements
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

