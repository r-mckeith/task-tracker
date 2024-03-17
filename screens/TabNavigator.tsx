import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './List';
import Buckets from './Buckets';

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
      <Tab.Screen name="Today" component={Buckets} options={{ headerShown: false }}/>
      <Tab.Screen name="To Do" component={List} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}