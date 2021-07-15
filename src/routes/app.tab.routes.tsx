import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeSvg from '../assets/tabBar/home.svg';
import CarSvg from '../assets/tabBar/car.svg';
import PeopleSvg from '../assets/tabBar/people.svg';

import { useTheme } from 'styled-components';

import AppStackRoutes from './app.stack.routes';
import Home from '../screens/Home';
import MyCars from '../screens/MyCars';

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 58,
          backgroundColor: theme.colors.background_primary
        }
      }}
    >
      <Screen 
        name='Home'
        component={AppStackRoutes}
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ))
        }}
      />
      <Screen 
        name='Profile'
        component={Home}
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ))
        }}
      />
      <Screen 
        name='MyCars'
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ))
        }}
      />
    </Navigator>
  );
}