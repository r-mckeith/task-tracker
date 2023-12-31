import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import TagScreen from './TagScreen';

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
      <Tab.Screen name="Home" component={TagScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={MainScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}