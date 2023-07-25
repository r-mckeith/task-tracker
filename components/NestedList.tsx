import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Task from './Task';

interface Task {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  recurring?: {
    isRecurring: boolean;
    frequency: {
      days: 'every day' | 'weekdays' | 'weekends' | 'custom';
      timesPerDay: number;
    };
  };
}

const NestedList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Health",
      parentId: null,
      completed: false,
      recurring: {
        isRecurring: false,
        frequency: {
          days: 'every day',
          timesPerDay: 1,
        },
      },
    },
    {
      id: 2,
      name: "Wealth",
      parentId: null,
      completed: false,
      recurring: {
        isRecurring: true,
        frequency: {
          days: 'weekdays',
          timesPerDay: 2,
        },
      },
    },
    {
      id: 3,
      name: "Relationships",
      parentId: null,
      completed: false,
      recurring: {
        isRecurring: true,
        frequency: {
          days: 'weekdays',
          timesPerDay: 2,
        },
      },
    },
    {
      id: 4,
      name: "Not tied to goals",
      parentId: null,
      completed: false,
      recurring: {
        isRecurring: true,
        frequency: {
          days: 'weekdays',
          timesPerDay: 2,
        },
      },
    }
  ]);
  

  const addTask = (
    name: string,
    parentId: number | null,
    isRecurring = false,
    frequency: { 
        days: 'every day' | 'weekdays' | 'weekends' | 'custom', 
        timesPerDay: number 
    } = { days: 'every day', timesPerDay: 1 }
  ) => {
    const newTask: Task = {
      id: tasks.length + 1,
      name: name,
      parentId: parentId,
      completed: false,
      recurring: isRecurring
        ? {
            isRecurring,
            frequency,
          }
        : undefined,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleCompleted = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    const recursiveDelete = (taskId: number) => {
      const childTasks = tasks.filter((task) => task.parentId === taskId);
      for (let childTask of childTasks) {
        recursiveDelete(childTask.id);
      }
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
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
            onPress={() => console.log(`Task with ID ${task.id} is pressed.`)}
            onAddSubTask={addTask}
            onToggleCompleted={toggleCompleted}
            onDelete={deleteTask}
            recurring={task.recurring}
          />
          {renderTasks(task.id)}
        </View>
      ));
  };

  return <View style={styles.container}>{renderTasks(null)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtask: {
    marginLeft: 20,
  },
});

export default NestedList;
