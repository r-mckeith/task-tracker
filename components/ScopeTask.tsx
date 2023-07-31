import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ScopeProps {
  id: number,
  inScopeDay?: boolean;
  inScopeWeek?: boolean;
  currentTab?: string;
  onToggleDay: (id: number) => void;
  onToggleWeek: (id: number) => void;
}

const ScopeTask: React.FC<ScopeProps> = ({
  id,
  inScopeDay,
  inScopeWeek,
  currentTab,
  onToggleDay,
  onToggleWeek,
}) => {
  
  const handleToggleScope = () => {
    currentTab === 'Day' ? onToggleDay(id) : onToggleWeek(id);
  };

  // Determine scope and color based on current tab
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
