import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { handleToggleScopeforDay } from '../../helpers/taskHelpers';
import { todayFormatted } from '../../helpers/taskHelpers';

interface Scope {
  id: number,
  inScopeDay: Date | string | null;
}

export default function ScopeTask({id, inScopeDay}: Scope) {
  const { state, dispatch } = useTaskContext();

  return (
    <View>
      <MaterialCommunityIcons 
        name={inScopeDay === todayFormatted ? "radiobox-marked" : "radiobox-blank"} 
        size={24} 
        color={inScopeDay === todayFormatted ? '#767577' : '#767577'}
        onPress={() => handleToggleScopeforDay(id, inScopeDay, state, dispatch)}
      />
    </View>
  );
};