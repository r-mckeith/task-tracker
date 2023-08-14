import { ComponentType } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import QuarterlyScreen from './QuarterlyScreen';
import ReviewQuarterScreen from './ReviewQuarterScreen';
import WeeklyScreen from '../week/WeeklyScreen'

export function QuarterlyStackScreen() {
  const QuarterlyStack = createStackNavigator();
  const TopTab = createMaterialTopTabNavigator();

  function QuarterlyTopTabs() {
    return (
      <TopTab.Navigator>
        <TopTab.Screen name="DailyScreen" component={QuarterlyScreen} options={{ title: 'Quarter' }} />
        <TopTab.Screen name="ReviewQuarter" component={ReviewQuarterScreen} options={{ title: 'Review' }} />
      </TopTab.Navigator>
    );
  }

  return (
    <QuarterlyStack.Navigator
      screenOptions={{
        headerBackTitle: 'This quarter',
        headerTintColor: '#767577',
    }}>
      <QuarterlyStack.Screen name="QuarterlyScreen" component={QuarterlyTopTabs} options={{ title: '' }}/>
      <QuarterlyStack.Screen name="ReviewQuarter" component={ReviewQuarterScreen as ComponentType} options={{ title: '' }}/>
    </QuarterlyStack.Navigator>
  );
}