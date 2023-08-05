import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTaskContext } from '../src/contexts/UseTaskContext';
import { TaskContext } from '../src/contexts/TaskContext';
import { handlePushTaskForDay, handlePushTaskForWeek } from '../helpers/taskHelpers';



interface PushTaskProps {
  id: number,
  inScopeDay?: Date | null;
  inScopeWeek?: Date | null;
  currentTab?: string;
}

const ScopeTask: React.FC<PushTaskProps> = ({
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

  const handlePushTask = () => {
    currentTab === 'ReviewDay' ? handlePushTaskForDay(id, !inScopeDay, state, dispatch) : handlePushTaskForWeek(id, !inScopeWeek, state, dispatch);
  };

  return (
    <View>
      <MaterialCommunityIcons 
        name={"arrow-right"} 
        size={24} 
        color={'orange'}
        onPress={handlePushTask}
      />
      <MaterialCommunityIcons 
        name={"arrow-right-thick"} 
        size={24} 
        color={'black'}
        onPress={handlePushTask}
      />
    </View>
  );
};

export default ScopeTask;
