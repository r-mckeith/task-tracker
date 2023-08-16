import { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import WeeklyScreen from './WeeklyScreen';
import ReviewWeekScreen from './ReviewWeekScreen';
import QuarterlyScreen from '../quarter/QuarterlyScreen'

const WeeklyStack = createStackNavigator<DoStackParamList>();
const TopTab = createMaterialTopTabNavigator();

function WeeklyTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="WeeklyScreen" component={WeeklyScreen} options={{ title: 'Week' }} />
      <TopTab.Screen name="ReviewWeek" component={ReviewWeekScreen} options={{ title: 'Review' }} />
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
      <WeeklyStack.Screen name="ReviewWeek" component={ReviewWeekScreen} options={{ title: '' }}/>
      <WeeklyStack.Screen name="ScopeWeek" component={QuarterlyScreen} options={{ title: '' }}/>
    </WeeklyStack.Navigator>
  );
}
