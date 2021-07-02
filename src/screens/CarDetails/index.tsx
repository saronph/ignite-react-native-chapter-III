import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Button from '../../components/Button';
import CarDTO from '../../dtos/CarDTO';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import * as S from './styles';

interface Params {
  car: CarDTO;
}

export default function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('Scheduling', {
      car
    });
  }

  function handleBack() {
    navigation.goBack();
  }
  
  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack}/>
      </S.Header>

      <S.CarImages>
        <ImageSlider imageURL={car.photos}/>
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>R$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)} 
              />
            ))
          }
        </S.Accessories>

        <S.About>
          {car.about}
        </S.About>
      </S.Content>

      <S.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
      </S.Footer>
    </S.Container>
  );
}