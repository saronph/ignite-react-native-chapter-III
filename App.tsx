import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { useFonts, Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';

import theme from './src/styles/theme';

import CarDetails from './src/screens/CarDetails';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_500Medium,
    Archivo_400Regular, 
    Archivo_500Medium, 
    Archivo_600SemiBold
  });

  if(!fontsLoaded) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color='blue'/>
      </View>
    )
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CarDetails />
    </ThemeProvider>
  );
}
