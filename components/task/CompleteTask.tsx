import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { handleToggleCompleted } from '../../helpers/taskHelpers';

interface CompleteTaskProps {
  id: number;
  completed: Date | null;
  pushed?: Date | null;
}

const CompleteTask = ({ id, completed, pushed }: CompleteTaskProps) => {
  const { name } = useRoute();
  const { state, dispatch } = useTaskContext();

  const reviewScreenNames = ['DailyReviewScreen', 'WeeklyReviewScreen', 'MonthlyReviewScreen'];
  const isReviewScreen = reviewScreenNames.includes(name);

  let iconName = 'checkbox-blank-outline';
  if (completed) {
    iconName = 'checkbox-marked-outline';
  } else if (pushed) {
    iconName = 'arrow-right';
  }

  const iconColor = 'grey';

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
