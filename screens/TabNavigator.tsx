import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DailyStackScreen } from './day/DailyStack';
import { WeeklyStackScreen } from './week/WeeklyStack';
import { QuarterlyStackScreen }  from './quarter/QuarterlyStack';

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
      <Tab.Screen name="Day" component={DailyStackScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Week" component={WeeklyStackScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Quarter" component={QuarterlyStackScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}