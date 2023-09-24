import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MonthlyScreen from './MonthlyScreen';
import WeeklyScreen from './WeeklyScreen';

const MonthlyStack = createStackNavigator();

export function MonthlyStackScreen() {
  return (
    <MonthlyStack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerTintColor: '#767577',
    }}>
      <MonthlyStack.Screen name="MonthlyDuo" component={MonthlyScreen} options={{ title: '' }}/>
      <MonthlyStack.Screen name="ScopeDay" component={WeeklyScreen} options={{ title: '' }}/>
      <MonthlyStack.Screen name="ScopeWeek" component={MonthlyScreen} options={{ title: '' }}/>
    </MonthlyStack.Navigator>
  );
}