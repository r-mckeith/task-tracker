import React, { useState } from 'react';
import { View, Text } from 'react-native';
import NestedList from '../components/NestedList';

interface Task {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  }

export default function HomeScreen() {
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
  return (
    <View style={{flex: 1}}>
      <NestedList taskProps={tasks} />
    </View>
  );
}