import { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import DailyScreen from './DailyScreen';
import DailyReviewScreen from './DailyReviewScreen';
import WeeklyScreen from '../week/WeeklyScreen';

const DailyStack = createStackNavigator<DoStackParamList>();
const TopTab = createMaterialTopTabNavigator();

function DailyTopTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="DailyScreen" component={DailyScreen} options={{ title: 'Day' }} />
      <TopTab.Screen name="DailyReviewScreen" component={DailyReviewScreen} options={{ title: 'Review' }} />
    </TopTab.Navigator>
  );
}

export function DailyStackScreen() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //       navigation.dispatch(
  //           CommonActions.reset({
  //               index: 0,
  //               routes: [{ name: 'DailyDuo' }],
  //           })
  //       );
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <DailyStack.Navigator
      screenOptions={{
        headerBackTitle: 'Today',
        headerTintColor: '#767577',
    }}>
      {/* <DailyStack.Screen name="DailyDuo" component={DailyTopTabs} options={{ title: '' }}/> */}
      <DailyStack.Screen name="DailyScreen" component={DailyScreen} options={{ title: '' }}/>
      <DailyStack.Screen name="ScopeDay" component={WeeklyScreen} options={{ title: '' }}/>
    </DailyStack.Navigator>
  );
}
