import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import Car from '../../components/Car';
import { CarStaticData } from '../../components/Car/car.data';

import * as S from './styles';

export default function Home() {
  const navigation = useNavigation();

  function handleCarDetails() {
    navigation.navigate('CarDetails');
  }
  
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
        <S.TotalCars>Total de 12 carros</S.TotalCars>
       </S.HeaderContent>
     </S.Header>

    <S.CarList 
      data={CarStaticData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => 
        <Car data={item} onPress={handleCarDetails}/>
      }
    />
     
   </S.Container>
  );
}