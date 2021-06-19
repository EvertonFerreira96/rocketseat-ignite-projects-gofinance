import React from 'react';

import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

import Dashboard from '../screens/Dashboards'; 
import Register from '../screens/Register'; 
import Resume from '../screens/Resume'; 

import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const { Navigator, Screen } = createBottomTabNavigator(); 

export default function AppRoutes(){
    const theme = useTheme(); 
    return (
        <Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.secondary,
                inactiveTintColor: theme.colors.text,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS === 'ios' ? RFValue(20) : 0,
                    height: RFValue(88)
                }
            }}
        >
            <Screen 
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                          name="format-list-bulleted"
                           size={size}
                           color={color}
                            />
                    ))
                }}
            />
           <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                          name="attach-money"
                           size={size}
                           color={color}
                            />
                    ))
                }}
            />
           <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                          name="pie-chart"
                           size={size}
                           color={color}
                            />
                    ))
                }}
            />


 
  
       </Navigator>
    );
}