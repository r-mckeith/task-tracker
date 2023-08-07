import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { handlePushTaskForDay, handlePushTaskForWeek } from '../../helpers/taskHelpers';

interface PushTaskProps {
  id: number,
  inScopeDay?: Date | null;
  inScopeWeek?: Date | null;
}

const ScopeTask: React.FC<PushTaskProps> = ({
  id,
  inScopeDay,
  inScopeWeek,
}) => {

  const { state, dispatch } = useTaskContext();
  const route = useRoute();

  const handlePushTask = () => {
    route.name === 'ReviewDay' ? handlePushTaskForDay(id, !inScopeDay, state, dispatch) : handlePushTaskForWeek(id, !inScopeWeek, state, dispatch);
  };

  return (
    <View>
      <MaterialCommunityIcons 
        name={"arrow-right"} 
        size={24} 
        color={'orange'}
        onPress={handlePushTask}
      />
    </View>
  );
};

export default ScopeTask;
