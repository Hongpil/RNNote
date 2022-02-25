import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../TabScreens/HomeScreen";
import DetailScreen from "../HomeScreens/DetailScreen";
import EditScreen from "../HomeScreens/EditScreen";

const Stack = createStackNavigator();

const HomeNavigationRoutes = () => {
    return (
        <Stack.Navigator 
        initialRouteName='Home'
        >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen
                name='DetailScreen' 
                component={DetailScreen}
                options = {{ headerTitle: '상세 화면' }}
            />
            <Stack.Screen 
                name='EditScreen' 
                component={EditScreen}
                options = {{ headerTitle: '수정 화면' }} />
        </Stack.Navigator>  
    );
};

export default HomeNavigationRoutes;

/* src/navigations/Stack.js */