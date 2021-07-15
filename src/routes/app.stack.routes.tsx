import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import CarDetails from '../screens/CarDetails';
import Scheduling from '../screens/Scheduling';
import Confirmation from '../screens/Confirmation';
import SchedulingDetails from '../screens/SchedulingDetails';
import MyCars from '../screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export default function AppStackRoutes() {
  return (
    <Navigator headerMode='none' initialRouteName="Home">
      <Screen 
        name='Home'
        component={Home}
      />
      <Screen 
        name='CarDetails'
        component={CarDetails}
      />
      <Screen 
        name='Scheduling'
        component={Scheduling}
      />
      <Screen 
        name='Confirmation'
        component={Confirmation}
      />
      <Screen 
        name='SchedulingDetails'
        component={SchedulingDetails}
      />
      <Screen 
        name='MyCars'
        component={MyCars}
      />
    </Navigator>
  );
}