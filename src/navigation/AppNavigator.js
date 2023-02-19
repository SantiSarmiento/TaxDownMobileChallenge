import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { loginNavigator, userNavigator } from '.';
import { useSelector } from 'react-redux'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

    const state = useSelector((state) => state.user.state)

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="loading">
                {
                    state
                        ?
                        userNavigator.map(({ name, component }) => {
                            return (
                                <Stack.Screen
                                    key={name}
                                    name={name}
                                    component={component}
                                    options={{
                                        headerShown: false,
                                        gestureEnabled: false
                                    }}
                                />
                            )
                        })
                        :
                        loginNavigator.map(({ name, component }) => {
                            return (
                                <Stack.Screen
                                    key={name}
                                    name={name}
                                    component={component}
                                    options={{
                                        headerShown: false,
                                        gestureEnabled: false
                                    }}
                                />
                            )
                        })
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator