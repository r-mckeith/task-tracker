import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../src/contexts/UseTaskContext';
import { TaskContext } from '../src/contexts/TaskContext';
import { handleToggleScopeforDay, handleToggleScopeforWeek } from '../helpers/taskHelpers';



interface ScopeProps {
  id: number,
  inScopeDay?: Date | null;
  inScopeWeek?: Date | null;
  currentTab?: string;
}

const ScopeTask: React.FC<ScopeProps> = ({
  id,
  inScopeDay,
  inScopeWeek,
  currentTab,
}) => {

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

  
  const handleToggleScope = () => {
    currentTab === 'Week' ? handleToggleScopeforDay(id, !inScopeDay, state, dispatch) : handleToggleScopeforWeek(id, !inScopeWeek, state, dispatch);
  };

  const inScope = currentTab === 'Week' ? inScopeDay : inScopeWeek;

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

export default ScopeTask;
