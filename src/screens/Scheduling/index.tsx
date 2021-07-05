import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps} from '../../components/Calendar';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import CarDTO from '../../dtos/CarDTO';

import * as S from './styles';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export default function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirm() {
    if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o intervalo para alugar.')
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      })
    }
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    })
  }

  return (
   <S.Container>
     <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
     />
     <S.Header>
       <BackButton color={theme.colors.shape} onPress={handleBack}/>

       <S.Title>
         Escolha uma{'\n'}
         data de início e{'\n'}
         fim do aluguel
       </S.Title>

       <S.RentalPeriod>
         <S.DateInfo>
           <S.DateTitle>DE</S.DateTitle>
           <S.DateValue selected={!!rentalPeriod.startFormatted}>
             {rentalPeriod.startFormatted}
           </S.DateValue>
         </S.DateInfo>
         <ArrowSvg />
         <S.DateInfo>
           <S.DateTitle>ATÉ</S.DateTitle>
           <S.DateValue selected={!!rentalPeriod.endFormatted}>
             {rentalPeriod.endFormatted}
           </S.DateValue>
         </S.DateInfo>
       </S.RentalPeriod>
     </S.Header>

     <S.Content>
      <Calendar 
        markedDates={markedDates}
        onDayPress={handleChangeDate}
      />
     </S.Content>

     <S.Footer>
       <Button 
        title="Confirmar"
        onPress={handleConfirm}
        enabled={!!rentalPeriod.endFormatted}
       />
     </S.Footer>
   </S.Container>
  );
}