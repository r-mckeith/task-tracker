import { createStackNavigator } from '@react-navigation/stack';
import { DoStackParamList } from '../../src/types/StackTypes';
import WeeklyScreen from './WeeklyScreen';
import ReviewWeekScreen from './ReviewWeekScreen';
import QuarterlyScreen from '../quarter/QuarterlyScreen'

const WeeklyStack = createStackNavigator<DoStackParamList>();

export function WeeklyStackScreen() {
  return (
    <WeeklyStack.Navigator
      screenOptions={{
        headerBackTitle: 'Today',
        headerTintColor: '#767577',
    }}>
      <WeeklyStack.Screen name="WeeklyScreen" component={WeeklyScreen} options={{ headerShown: false }}/>
      <WeeklyStack.Screen name="ReviewWeek" component={ReviewWeekScreen} options={{ title: '' }}/>
      <WeeklyStack.Screen name="ScopeWeek" component={QuarterlyScreen} options={{ title: '' }}/>
    </WeeklyStack.Navigator>
  );
}
