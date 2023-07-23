import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SortableList from 'react-native-sortable-list';

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

  // Function to update the order of the list items when an item is moved
  const onRowMoved = (
    e: { from: number; to: number; row: Task } // Define a custom type for the argument
  ) => {
    const newData = [...tasks]; // Create a new copy of the tasks array
    newData.splice(e.to, 0, newData.splice(e.from, 1)[0]); // Move the task from 'e.from' to 'e.to' in the newData array
    setTasks(newData); // Update the state with the new order of the tasks
  };

  // Function to recursively render a task and its children
  const renderTask = (task: Task) => {
    return (
      <View key={task.id}>
        <Text style={styles.taskName}>{task.name}</Text>
        {task.children && (
          <SortableList
            data={task.children}
            renderRow={renderTask as any}
            onChangeOrder={onRowMoved as any}
          />
        )}
      </View>
    );
  };

  // Create the nested data structure for the root tasks
  const nestedData: Task[] = createNestedData(null);

  return (
    <View style={styles.container}>
      {/* Render the button to add a new child task */}
      <Button title="Add Child Task" onPress={() => console.log('Add child task')} />

      {/* Render the tasks as a nested, sortable list */}
      <SortableList
        data={nestedData}
        renderRow={renderTask as any}
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
  taskName: {
    fontSize: 18,
  },
});

export default NestedSortableList;
