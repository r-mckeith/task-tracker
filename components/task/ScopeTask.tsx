import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { handleToggleScopeforDay, handleToggleScopeforWeek } from '../../helpers/taskHelpers';
import { todayFormatted } from '../../helpers/taskHelpers';

interface ScopeProps {
  id: number,
  inScopeDay: Date | string | null;
  inScopeWeek: Date | string | null;
  filter?: string | null;
}

export default function ScopeTask({id, inScopeDay, inScopeWeek, filter}: ScopeProps) {
  const { state, dispatch } = useTaskContext();
  const route = useRoute();


  const handleToggleScope = () => {
    console.log(filter)
    filter === 'month' ? handleToggleScopeforWeek(id, inScopeWeek, state, dispatch) : handleToggleScopeforDay(id, inScopeDay, state, dispatch);
  };

  // const inScope = route.name === 'ScopeDay' ? inScopeDay === todayFormatted : inScopeWeek;

  const inScope = filter === 'month' ? inScopeWeek : inScopeDay === todayFormatted;

  return (
    <View>
      <MaterialCommunityIcons 
        name={inScope ? "radiobox-marked" : "radiobox-blank"} 
        size={24} 
        color={inScope ? '#767577' : '#767577'}
        onPress={handleToggleScope}
      />
    </View>
  );
};