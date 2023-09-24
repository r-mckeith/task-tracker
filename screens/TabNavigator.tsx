import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MonthlyStackScreen } from './month/MonthlyStackScreen';

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
      <Tab.Screen name="Home" component={MonthlyStackScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={MonthlyStackScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}