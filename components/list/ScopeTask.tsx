import React, { useState, useEffect} from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTagContext } from '../../src/contexts/tags/UseTagContext';
import { handleToggleScope } from '../../helpers/taskHelpers';
import { useDateContext } from '../../src/contexts/date/useDateContext';

interface Scope {
  id: number,
  inScopeDay: Date | string | null;
}

export default function ScopeTask({id, inScopeDay}: Scope) {
  const [inScope, setInScope] = useState<any>();
  const { dispatch } = useTagContext();
  const { selectedDate } = useDateContext();

  useEffect(() => {
    setInScope(inScopeDay && inScopeDay <= selectedDate.toISOString().split('T')[0]);
  }, [inScopeDay]);

  const toggleScope = () => {
    handleToggleScope(id, selectedDate.toISOString().split('T')[0], dispatch);
  };

  return (
    <View>
      <MaterialCommunityIcons 
        name={inScope ? "radiobox-marked" : "radiobox-blank"} 
        size={24} 
        color={'#767577'}
        onPress={toggleScope}
      />
    </View>
  );
};