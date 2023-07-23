import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Define the interface for the task object
interface Task {
  id: number;
  name: string;
  parentId: number | null; // Reference to the parent task
}

const NestedList: React.FC = () => {
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

  // Function to add a new task with the specified name and parent ID
  const addTask = (taskName: string, parentId: number | null) => {
    const newTask: Task = {
      id: tasks.length + 1,
      name: taskName,
      parentId,
    };

    // Update the tasks state with the new task
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Example usage of addTask function to add a new task with a parent
  const handleAddChildTask = () => {
    // Suppose you want to add a task named "Lose 10 lbs" under the parent task with ID 1
    addTask('Lose 10 lbs', 1);
  };

  // Function to recursively render a task and its children
  const renderTask = (task: Task) => {
    const childTasks = tasks.filter((t) => t.parentId === task.id);
    return (
      <View key={task.id}>
        <Text style={styles.taskName}>{task.name}</Text>
        {childTasks.length > 0 && (
          <View style={styles.childTasksContainer}>
            {childTasks.map((childTask) => renderTask(childTask))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Render the button to add a new child task */}
      <Button title="Add Child Task" onPress={handleAddChildTask} />

      {/* Render the tasks as a nested list */}
      <View style={styles.tasksContainer}>
        {tasks
          .filter((task) => task.parentId === null) // Filter root tasks
          .map((task) => renderTask(task))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tasksContainer: {
    marginTop: 20,
  },
  taskName: {
    fontSize: 18,
  },
  childTasksContainer: {
    marginLeft: 20,
    marginTop: 10,
  },
});

export default NestedList;

