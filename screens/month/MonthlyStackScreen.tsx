import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MonthlyScreen from './MonthlyScreen';
import MonthlyReviewScreen from './MonthlyReviewScreen';

const MonthlyStack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

function MonthlyTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="MonthlyScreen" component={MonthlyScreen} options={{ title: 'Plan' }} />
      <TopTab.Screen name="MonthlyReviewScreen" component={MonthlyReviewScreen} options={{ title: 'Review' }} />
    </TopTab.Navigator>
  );
}

export function MonthlyStackScreen() {
  return (
    <MonthlyStack.Navigator
      screenOptions={{
        headerBackTitle: 'This Month',
        headerTintColor: '#767577',
    }}>
      <MonthlyStack.Screen name="MonthlyDuo" component={MonthlyTopTabs} options={{ title: '' }}/>
    </MonthlyStack.Navigator>
  );
}