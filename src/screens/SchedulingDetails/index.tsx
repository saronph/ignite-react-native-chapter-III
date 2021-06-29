import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import Button from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import * as S from './styles';

export default function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate('SchedulingComplete')
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}}/>
      </S.Header>

      <S.CarImages>
      <ImageSlider imageURL={[
        'https://production.autoforce.com/uploads/version/profile_image/3188/model_main_comprar-tiptronic_87272c1ff1.png']}/>
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao dia</S.Period>
            <S.Price>R$ 500,00</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          <Accessory name="380Km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 Pessoas" icon={PeopleSvg} />
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
            <S.DateValue>18/06/2021</S.DateValue>
          </S.DateInfo>

          <Feather 
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <S.DateInfo>
            <S.DateTitle>até</S.DateTitle>
            <S.DateValue>18/06/2021</S.DateValue>
          </S.DateInfo>


        </S.RentalPeriod>
      
        <S.RentalPrice>
        <S.RentalPriceLabel>Total</S.RentalPriceLabel>
        <S.RentalPriceDetails>
          <S.RentalPriceQuota>R$ 580 x3 diárias</S.RentalPriceQuota>
          <S.RentalPriceTotal>R$ 2.900,00</S.RentalPriceTotal>
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