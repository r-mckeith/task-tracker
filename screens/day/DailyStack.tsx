import { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import DailyScreen from './DailyScreen';
import ReviewDayScreen from './ReviewDayScreen';
import WeeklyScreen from '../week/WeeklyScreen';

const DailyStack = createStackNavigator<DoStackParamList>();

export function DailyStackScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'DailyScreen' }],
            })
        );
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <DailyStack.Navigator
      screenOptions={{
        headerBackTitle: 'Today',
        headerTintColor: '#767577',
    }}>
      <DailyStack.Screen name="DailyScreen" component={DailyScreen} options={{ title: '' }}/>
      <DailyStack.Screen name="ReviewDay" component={ReviewDayScreen} options={{ title: '' }}/>
      <DailyStack.Screen name="ScopeDay" component={WeeklyScreen} options={{ title: '' }}/>
    </DailyStack.Navigator>
  );
}
