import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { handleToggleCompleted } from '../../helpers/taskHelpers';

interface CompleteTaskProps {
  id: number;
  completed: Date | null;
}

const CompleteTask: React.FC<CompleteTaskProps> = ({ id, completed }) => {
  const { name } = useRoute();
  const { state, dispatch } = useTaskContext();

  const reviewScreenNames = ['ReviewDay', 'ReviewWeek', 'ReviewQuarter'];
  const isReviewScreen = reviewScreenNames.includes(name);

  const iconName = completed ? 'checkbox-marked-outline' : 'checkbox-blank-outline';

  const iconColor = completed ? 'grey' : 'grey';

  return (
    <View>
      <MaterialCommunityIcons
        name={iconName}
        size={24}
        color={iconColor}
        onPress={() => handleToggleCompleted(id, completed, state, dispatch)}
      />
    </View>
  );
};

export default CompleteTask;

