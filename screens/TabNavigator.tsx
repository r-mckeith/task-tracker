import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DailyScreen from './daily/DailyScreen';
import WeeklyScreen from './week/WeeklyScreen';
import MonthlyScreen from './month/MonthlyScreen';

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
      <Tab.Screen name="Priorities" component={MonthlyScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Focus" component={WeeklyScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Execute" component={DailyScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}