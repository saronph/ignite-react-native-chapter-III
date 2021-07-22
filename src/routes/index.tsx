import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import AuthRoutes from './auth.routes';
import AppTabRoutes from './app.tab.routes';

export default function Routes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      { user.id ? <AppTabRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  );
}