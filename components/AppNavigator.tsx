import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/DailyScreen.js';
import SettingsScreen from '../screens/WeeklyScreen.js';
import ReviewScreen from '../screens/ReviewScreen.js';
import ScopeScreen from '../screens/ScopeScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={MyTabs} />
        <Stack.Screen name="Scope" component={ScopeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
