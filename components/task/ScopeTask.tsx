import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../../src/contexts/tasks/UseTaskContext';
import { handleToggleScopeforDay } from '../../helpers/taskHelpers';
import { todayFormatted } from '../../helpers/taskHelpers';
import { useDateContext } from '../../src/contexts/date/useDateContext';

interface Scope {
  id: number,
  inScopeDay: Date | string | null;
}

export default function ScopeTask({id, inScopeDay}: Scope) {
  const { dispatch } = useTaskContext();
  const { selectedDate } = useDateContext();

  const toggleScope = () => {
    handleToggleScopeforDay(id, selectedDate.toISOString().split('T')[0], dispatch);
  };
  if (id === 256) {
    console.log('inScopeDay', inScopeDay, 'selectedDate', selectedDate)
  }

  return (
    <View>
      <MaterialCommunityIcons 
        name={inScopeDay === selectedDate.toISOString().split('T')[0] ? "radiobox-marked" : "radiobox-blank"} 
        size={24} 
        color={inScopeDay === selectedDate.toISOString().split('T')[0] ? '#767577' : '#767577'}
        onPress={toggleScope}
      />
    </View>
  );
};