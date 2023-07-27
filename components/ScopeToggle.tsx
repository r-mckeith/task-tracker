import React from 'react';
import { Button, Text, View } from 'react-native';
import { TaskDataInterface } from '../src/types/Types';

interface IconProps {
  id: number,
  inScopeDay: boolean;
  inScopeWeek: boolean;
}

interface ScopeTaskProps {
  id: number;
  tasks: TaskDataInterface[];
  inScopeWeek: boolean;
  mode: 'all' | 'week';
  toggleInScopeWeek: (id: number) => void;
  toggleInScopeDay: (id: number) => void;
  onToggleScope: (id: number) => void;
}
  
const ScopeTask: React.FC<ScopeTaskProps> = ({ id, tasks, mode, toggleInScopeWeek, toggleInScopeDay, onToggleScoped }) => {
  const tasksToDisplay = mode === 'all' ? tasks : tasks.filter(task => task.inScopeWeek);

  const handleToggleCompleted = () => {
    onToggleScoped(id);
  };

  return (
    <View>
      {tasksToDisplay.map(task => (
        <View key={task.id}>
          <Text>{task.name}</Text>
          <Button 
            onPress={() => toggleInScopeWeek(task.id)}
            title={task.inScopeWeek ? 'Remove from This Week' : 'Add to This Week'}
          />
          <Button 
            onPress={() => toggleInScopeDay(task.id)}
            title={task.inScopeDay ? 'Remove from Today' : 'Add to Today'}
            disabled={!task.inScopeWeek} // disable if not inScopeWeek
          />
        </View>
      ))}
    </View>
  );
};

export default ScopeTask;