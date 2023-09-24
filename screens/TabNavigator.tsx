import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DailyStackScreen } from './daily/DailyStackScreen';
import { WeeklyStackScreen } from './week/WeeklyStack';
import { MonthlyStackScreen }  from './month/MonthlyStackScreen';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
        },
      }}
    >
      <Tab.Screen name="Do" component={DailyStackScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Plan" component={MonthlyStackScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}