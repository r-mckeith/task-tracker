import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ScopeProps {
  id: number,
  inScope?: boolean;
  onToggleScope: (id: number) => void;
}

const ScopeTask: React.FC<ScopeProps> = ({
  id,
  inScope,
  onToggleScope,
}) => {
  

  const handleToggleScope = () => {
    onToggleScope(id);
  };

  return (
      <View>
        <MaterialCommunityIcons 
          name={inScope ? "toggle-switch" : "toggle-switch-off"} 
          size={24} 
          color={inScope ? 'green' : 'black'}
          onPress={handleToggleScope}
        />
      </View>
  );
};

export default ScopeTask;