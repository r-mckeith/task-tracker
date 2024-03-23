import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tasks from './Tasks';
import Tags from './Tags';

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
      <Tab.Screen name="Today" component={Tags} options={{ headerShown: false }}/>
      <Tab.Screen name="Projects" component={Tasks} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}