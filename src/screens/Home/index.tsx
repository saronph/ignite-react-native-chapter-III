import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import CarDTO from '../../dtos/CarDTO';

import Car from '../../components/Car';
import Load from '../../components/Load';

import * as S from './styles';

export default function Home() {
  const [ cars, setCars ] = useState<CarDTO[]>([]);
  const [ loading, setLoading ] = useState(true);
  const navigation = useNavigation();

  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car } );
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  
 return (
   <S.Container>
     <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
     />
     <S.Header>
       <S.HeaderContent>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <S.TotalCars>Total de {cars.length} carros</S.TotalCars>
       </S.HeaderContent>
     </S.Header>

    { loading ? <Load /> :
      <S.CarList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <Car data={item} onPress={() => handleCarDetails(item)}/>
        }
      />
    }

    <S.MyCarsButton onPress={handleOpenMyCars}>
      <Ionicons 
        name="ios-car-sport" 
        size={32}
        color={theme.colors.shape}
      />
    </S.MyCarsButton>

   </S.Container>
  );
}