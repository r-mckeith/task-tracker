import React, { useState } from 'react';
import { View, Text } from 'react-native';
import NestedList from '../components/NestedList';

interface Task {
  id: number;
  name: string;
  parentId: number | null;
  completed: boolean;
  recurringOptions: {
    isRecurring: boolean;
    selectedDays: string;
    timesPerDay: string;
  } | null;
  depth: number;
  }

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([  {
    id: 1,
    name: 'Health',
    parentId: null,
    completed: false,
    recurringOptions: null,
    depth: 0,

  },
  {
    id: 2,
    name: 'Wealth',
    parentId: null,
    completed: false,
    recurringOptions: null,
    depth: 0,
  },
  {
    id: 3,
    name: 'Relationships',
    parentId: null,
    completed: false,
    recurringOptions: null,
    depth: 0,
  },
  {
    id: 4,
    name: 'Not tied to goals',
    parentId: null,
    completed: false,
    recurringOptions: null,
    depth: 0,
  },
]);
  return (
    <View style={{flex: 1}}>
      <NestedList taskProps={tasks} />
    </View>
  );
}