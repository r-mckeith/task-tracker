import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { useTaskContext } from '../src/contexts/UseTaskContext';
import NestedList from '../components/NestedList';

function HomeScreen() {
  const { loading, state } = useTaskContext();

  if (loading || !state) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <NestedList taskProps={state} currentTab={'Quarter'} />    
    </View>
  );
}

export default HomeScreen;