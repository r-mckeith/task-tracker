import { ComponentType } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import QuarterlyScreen from './QuarterlyScreen';
import ReviewQuarterScreen from './ReviewQuarterScreen';

const QuarterlyStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function QuarterlyTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="QuarterlyScreen" component={QuarterlyScreen} options={{ title: 'Quarter' }} />
      <TopTab.Screen name="ReviewQuarter" component={ReviewQuarterScreen} options={{ title: 'Review' }} />
    </TopTab.Navigator>
  );
}

export function QuarterlyStackScreen() {
  return (
    <QuarterlyStack.Navigator
      screenOptions={{
        headerBackTitle: 'This quarter',
        headerTintColor: '#767577',
    }}>
      <QuarterlyStack.Screen name="QuarterlyDuo" component={QuarterlyTopTabs} options={{ title: '' }}/>
      <QuarterlyStack.Screen name="ReviewQuarter" component={ReviewQuarterScreen as ComponentType} options={{ title: '' }}/>
    </QuarterlyStack.Navigator>
  );
}