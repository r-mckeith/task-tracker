import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DraggableFlatList, { DragEndParams } from 'react-native-draggable-flatlist';

// Define the interface for the task object
interface Task {
  id: number;
  name: string;
  parentId: number | null; // Reference to the parent task
  children?: Task[]; // Define children property as an optional array of Task
}

const NestedSortableList: React.FC = () => {
  // State variable to hold the current tasks data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: 'Health',
      parentId: null,
    },
    {
      id: 2,
      name: 'Wealth',
      parentId: null,
    },
    {
      id: 3,
      name: 'Relationships',
      parentId: null,
    },
    {
      id: 4,
      name: 'Lose 10 lbs',
      parentId: 1,
    },
    {
      id: 5,
      name: 'Increase users 10%',
      parentId: 2,
    },
    {
      id: 6,
      name: 'Plan family reunion',
      parentId: 3,
    },
    {
      id: 7,
      name: 'Write content',
      parentId: 5,
    },
  ]);

  // Function to convert the flat tasks array into a nested data structure
  const createNestedData = (parentId: number | null) => {
    const childTasks = tasks.filter((task) => task.parentId === parentId);
    const nestedData: Task[] = childTasks.map((task) => ({
      ...task,
      children: createNestedData(task.id),
    }));
    return nestedData;
  };

  // Create the nested data structure for the root tasks
  const nestedData: Task[] = createNestedData(null);

  // Function to handle the end of drag and update the tasks order
  const onDragEnd = ({ data }: DragEndParams<Task>) => {
    setTasks(data);
  };

  // Function to render each item in the list
  const renderItem = ({ item }: { item: Task }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.taskName}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Render the button to add a new child task */}
      <Button title="Add Child Task" onPress={() => console.log('Add child task')} />

      {/* Render the tasks as a nested, sortable list */}
      <DraggableFlatList
        data={nestedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onDragEnd={onDragEnd}
        nestedScrollEnabled
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
  taskName: {
    fontSize: 18,
  },
});

export default NestedSortableList;
