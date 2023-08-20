import { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import WeeklyScreen from './WeeklyScreen';
import WeeklyReviewScreen from './WeeklyReviewScreen';
import MonthlyScreen from '../month/MonthlyScreen'

const WeeklyStack = createStackNavigator<DoStackParamList>();
const TopTab = createMaterialTopTabNavigator();

function WeeklyTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="WeeklyScreen" component={WeeklyScreen} options={{ title: 'Week' }} />
      <TopTab.Screen name="WeeklyReviewScreen" component={WeeklyReviewScreen} options={{ title: 'Review' }} />
    </TopTab.Navigator>
  );
}

export function WeeklyStackScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'WeeklyDuo' }],
            })
        );
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <WeeklyStack.Navigator
      screenOptions={{
        headerBackTitle: 'This week',
        headerTintColor: '#767577',
    }}>
      <WeeklyStack.Screen name="WeeklyDuo" component={WeeklyTopTabs} options={{ title: '' }}/>
      <WeeklyStack.Screen name="WeeklyReviewScreen" component={WeeklyReviewScreen} options={{ title: '' }}/>
      <WeeklyStack.Screen name="ScopeWeek" component={MonthlyScreen} options={{ title: '' }}/>
    </WeeklyStack.Navigator>
  );
}
