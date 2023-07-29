import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskContext } from '../src/contexts/TaskContext';
import { TaskInterface } from '../src/types/TaskTypes'
import NestedList from '../components/NestedList';

export default function HomeScreen() {
  const context = useContext(TaskContext);

  if (!context) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const { state, dispatch } = context;

  return (
    <View style={styles.container}>
      <NestedList taskProps={state} planningScreen={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
});
