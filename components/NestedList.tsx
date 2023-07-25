import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Task from './Task';

interface Task {
id: number;
name: string;
parentId: number | null;
completed: boolean;
}

interface NestedListProps {
  taskProps: Task[];
}

const NestedList: React.FC<NestedListProps> = ({taskProps}) => {
    const [tasks, setTasks] = useState<Task[]>(taskProps);

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

const deleteTask = (id: number) => {
  // This will recursively delete all children tasks
  const recursiveDelete = (taskId: number) => {
    const childTasks = tasks.filter(task => task.parentId === taskId);
    for (let childTask of childTasks) {
      recursiveDelete(childTask.id);
    }
    setTasks(tasks => tasks.filter(task => task.id !== taskId));
  };

  recursiveDelete(id);
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
          onDelete={deleteTask}
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


