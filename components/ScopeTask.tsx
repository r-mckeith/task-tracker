import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TaskContext } from '../src/contexts/TaskContext';

interface ScopeProps {
  id: number,
  inScopeDay?: boolean | null;
  inScopeWeek?: boolean | null;
  currentTab?: string;
}

const ScopeTask: React.FC<ScopeProps> = ({
  id,
  inScopeDay,
  inScopeWeek,
  currentTab,
}) => {

  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { dispatch } = context;

  const onToggleDay = () => {
    dispatch({ type: 'TOGGLE_DAY', id: id })
  } 

  const onToggleWeek = () => {
    dispatch({ type: 'TOGGLE_WEEK', id: id })
  } 
  
  const handleToggleScope = () => {
    currentTab === 'Day' ? onToggleDay() : onToggleWeek();
  };

  const inScope = currentTab === 'Day' ? inScopeDay : inScopeWeek;
  const color = inScope ? 'green' : 'black';

  return (
    <View>
      <MaterialCommunityIcons 
        name={inScope ? "radiobox-marked" : "radiobox-blank"} 
        size={24} 
        color={inScope ? 'blue' : 'black'}
        onPress={handleToggleScope}
      />
    </View>
  );
};

export default ScopeTask;
