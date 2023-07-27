import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import NestedList from '../components/NestedList';

export default function HomeScreen() {
  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { state, dispatch } = context;

  return (
    <View style={{flex: 1}}>
      <NestedList taskProps={state} planningScreen={true} /> 
    </View>
  );
}
