import { ComponentType } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DailyScreen from './QuarterlyScreen';
import ReviewQuarterScreen from './ReviewQuarterScreen';
import WeeklyScreen from '../week/WeeklyScreen'

export function QuarterlyStackScreen() {
  const DailyStack = createStackNavigator();

  return (
    <DailyStack.Navigator
      screenOptions={{
        headerBackTitle: 'Today',
        headerTintColor: '#767577',
    }}>
      <DailyStack.Screen name="QuarterlyScreen" component={DailyScreen} options={{ title: '' }}/>
      <DailyStack.Screen name="ReviewDay" component={ReviewQuarterScreen as ComponentType} options={{ title: '' }}/>
    </DailyStack.Navigator>
  );
}