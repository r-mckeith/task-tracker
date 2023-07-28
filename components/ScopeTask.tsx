import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ScopeProps {
  id: number,
  inScopeDay?: boolean;
  inScopeWeek?: boolean;
  onToggleScope: (id: number) => void;
  currentTab?: string;
}

const ScopeTask: React.FC<ScopeProps> = ({
  id,
  inScopeDay,
  inScopeWeek,
  onToggleScope,
  currentTab
}) => {
  
  const handleToggleScope = () => {
    onToggleScope(id);
  };

  // Determine scope and color based on current tab
  const inScope = currentTab === 'Day' ? inScopeDay : inScopeWeek;
  const color = inScope ? 'green' : 'black';

  return (
    <View>
      <MaterialCommunityIcons 
        name={inScope ? "toggle-switch" : "toggle-switch-off"} 
        size={24} 
        color={color}
        onPress={handleToggleScope}
      />
    </View>
  );
};

export default ScopeTask;
