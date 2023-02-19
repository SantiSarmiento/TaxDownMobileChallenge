import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { VStack } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons'
import Home from "../screens/home/Home";
import Taxes from "../screens/taxes/Taxes";

const HomeStack = createMaterialTopTabNavigator();

export function NavigatorScreenStack(props) {
    return (
        <HomeStack.Navigator
            tabBarPosition="bottom"
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: "#0fd48e",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: "white",
                    height: "9%"
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#0fd48e",
                    position: "absolute",
                    top: 0
                }
            }}
        >
            <HomeStack.Screen
                name="home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <VStack alignItems={"center"}>
                            <Icon name={"home-outline"} size={18} color={focused ? "#16a34a" : "grey"} />
                        </VStack>
                    ),
                    swipeEnabled: false
                }}
            />
            <HomeStack.Screen
                name="taxes"
                component={Taxes}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <VStack alignItems={"center"}>
                            <Icon name={"md-document-text-outline"} size={18} color={focused ? "#16a34a" : "grey"} />
                        </VStack>
                    ),
                    swipeEnabled: false
                }}
            />
        </HomeStack.Navigator>
    );
}