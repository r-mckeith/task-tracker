import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Modal, Switch, TouchableOpacity } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  id: number,
  completed: boolean;
  onToggleCompleted: (id: number) => void;
}

const CompletionIcon: React.FC<IconProps> = ({
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
          name={completed ? "checkbox-marked-circle-outline" : "checkbox-blank-circle-outline"} 
          size={24} 
          color={completed ? 'green' : 'black'}
          onPress={handleToggleCompleted}
        />
      </View>
  );
};

export default CompletionIcon;
