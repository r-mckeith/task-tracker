import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Task from './Task';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Task {
id: number;
name: string;
parentId: number | null;
completed: boolean;
}

const NestedList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([  {
    id: 1,
    name: 'Health',
    parentId: null,
    completed: false,

  },
  {
    id: 2,
    name: 'Wealth',
    parentId: null,
    completed: false,
  },
  {
    id: 3,
    name: 'Relationships',
    parentId: null,
    completed: false,
  },
  {
    id: 4,
    name: 'Not tied to goals',
    parentId: null,
    completed: false,
  },
]);


const [newTaskName, setNewTaskName] = useState('');

const addTask = (name: string, parentId: number | null) => {
  const newTask: Task = {
    id: tasks.length + 1,
    name: name,
    parentId: parentId,
    completed: false,
  };
  setTasks([...tasks, newTask]);
};

const handleTaskPress = (taskId: number) => {
  console.log(`Task with ID ${taskId} is pressed.`);
};

const toggleCompleted = (id: number) => {
  setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
};


const renderTasks = (parentId: number | null) => {
  return tasks
    .filter((task) => task.parentId === parentId)
    .map((task) => (
      <View key={task.id} style={parentId !== null ? styles.subtask : undefined}>
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          parentId={task.parentId}
          completed={task.completed}
          onPress={() => handleTaskPress(task.id)}
          onAddSubTask={addTask}
          onToggleCompleted={toggleCompleted}
        />
        {renderTasks(task.id)}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {renderTasks(null)}
    </View>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
},
input: {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginTop: 20,
  padding: 10,
},
subtask: {
  marginLeft: 20,
},
});

export default NestedList;


