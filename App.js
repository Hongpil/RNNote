/**
 * npx react-native init ToDoApp2
 * 
 * [Local Storage]
    * npm install @react-native-async-storage/async-storage
 * [Navigation]
    * npm install --save @react-navigation/native
    * npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    * npm install @react-navigation/stack
 * [Navigation Drawer]
    * npm install --save @react-navigation/drawer
 * [HTTP]
    * npm install axios
 * [Tab Navigation]
    * npm install @react-navigation/bottom-tabs
 * [Ionicons]
    * npm install react-native-vector-icons
 * 
 * cd ios -> pod install -> cd ..
 * 
 * [Android]
 * npx react-native run-android
 * [IOS]
 * xed ./ios
 * 실행된 xcode 에서 단말기 선택 후 run
 */
import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';
// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// Import Screens
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import TabNavigationRoutes from './Screen/Navigations/TabNavigationRoutes';


const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerStyle: {
            backgroundColor: '#307ecc',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNavigationRoutes"
          component={TabNavigationRoutes}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;