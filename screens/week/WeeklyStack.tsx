import { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import WeeklyScreen from './WeeklyScreen';
import ReviewWeekScreen from './ReviewWeekScreen';
import QuarterlyScreen from '../quarter/QuarterlyScreen'

const WeeklyStack = createStackNavigator<DoStackParamList>();

type WeeklyStackScreenProps = StackScreenProps<DoStackParamList>;

export function WeeklyStackScreen({ navigation }: WeeklyStackScreenProps) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'WeeklyScreen' }],
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
      <WeeklyStack.Screen name="WeeklyScreen" component={WeeklyScreen} options={{ title: '' }}/>
      <WeeklyStack.Screen name="ReviewWeek" component={ReviewWeekScreen} options={{ title: '' }}/>
      <WeeklyStack.Screen name="ScopeWeek" component={QuarterlyScreen} options={{ title: '' }}/>
    </WeeklyStack.Navigator>
  );
}
