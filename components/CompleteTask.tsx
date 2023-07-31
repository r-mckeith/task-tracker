import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  id: number,
  completed?: boolean;
  onToggleCompleted: (id: number) => void;
}

const CompleteTask: React.FC<IconProps> = ({
  id,
  completed,
  onToggleCompleted,
}) => {
  

  const handleToggleCompleted = () => {
    onToggleCompleted(id);
  };

  return (
      <View>
        <MaterialCommunityIcons 
          name={completed ? "radiobox-marked" : "radiobox-blank"} 
          size={24} 
          color={completed ? 'blue' : 'black'}
          onPress={handleToggleCompleted}
        />
      </View>
  );
};

export default CompleteTask;
