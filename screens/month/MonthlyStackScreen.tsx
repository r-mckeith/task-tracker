import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MonthlyScreen from './MonthlyScreen';

const MonthlyStack = createStackNavigator();

export function MonthlyStackScreen() {
  return (
    <MonthlyStack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerTintColor: '#767577',
    }}>
      <MonthlyStack.Screen name="Month" component={MonthlyScreen} options={{ title: '' }}/>
    </MonthlyStack.Navigator>
  );
}