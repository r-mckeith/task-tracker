import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MonthlyScreen from './month/MonthlyScreen';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
        },
      }}
    >
      <Tab.Screen name="Home" component={MonthlyScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={MonthlyScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}