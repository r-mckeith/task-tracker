import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TaskContext } from '../src/contexts/TaskContext';
import { useTaskContext } from '../src/contexts/UseTaskContext';
import { handleToggleCompleted } from '../helpers/taskHelpers';

interface CompleteTaskProps {
  id: number,
  completed?: boolean;
}

const CompleteTask: React.FC<CompleteTaskProps> = ({
  id,
  completed,
}) => {
  const route = useRoute()
  const context = useContext(TaskContext);

  const { loading, state } = useTaskContext();

  if (loading || !state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

const { dispatch } = context;

  function reviewScreen() {
    return route.name === 'ReviewDay' ||
    route.name === "ReviewWeek"
  }

  return (
      <View>
      <MaterialCommunityIcons 
        name={
          reviewScreen()
            ? (completed ? "check-circle" : "close-circle")
            : (completed ? "check-circle" : "circle-outline")
        }
        size={24} 
        color={
          reviewScreen()
          ? (completed ? 'green' : 'red')
          : (completed ? 'green' : 'black')
        }
        onPress={() => handleToggleCompleted(id, !completed, state, dispatch)}
      />
      </View>
  );
};

export default CompleteTask;
