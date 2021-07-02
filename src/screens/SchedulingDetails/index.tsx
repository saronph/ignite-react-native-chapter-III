import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Button from '../../components/Button';
import CarDTO from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import api from '../../services/api';

import * as S from './styles';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export default function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirm() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post('schedules_bycars', {
      user_id: 1,
      car
    });

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => navigation.navigate('SchedulingComplete'))
    .catch(() => Alert.alert('Não foi possível confirmar o agendamento'))
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])

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

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather 
            name='calendar'
            size={RFValue(24)}
            color={theme.colors.shape}
            />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.start}</S.DateValue>
          </S.DateInfo>

          <Feather 
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>até</S.DateTitle>
            <S.DateValue>{rentalPeriod.end}</S.DateValue>
          </S.DateInfo>


        </S.RentalPeriod>
      
        <S.RentalPrice>
        <S.RentalPriceLabel>Total</S.RentalPriceLabel>
        <S.RentalPriceDetails>
          <S.RentalPriceQuota>
            R$ {car.rent.price} x {dates.length} diárias
          </S.RentalPriceQuota>
          <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
        </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirm} 
        />
      </S.Footer>
    </S.Container>
  );
}