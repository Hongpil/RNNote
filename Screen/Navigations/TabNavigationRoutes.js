import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from '../TabScreens/SettingsScreen';
import HomeNavigationRoutes from './HomeNavigationRoutes';


const Tab = createBottomTabNavigator();

export default function TabNavigationRoutes({ navigation }) {
  return (
    <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeNavigationRoutes}
          options = {{ headerShown: false }}
          />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          />
    </Tab.Navigator>
  );
}