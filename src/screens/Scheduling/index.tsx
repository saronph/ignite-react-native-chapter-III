import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps} from '../../components/Calendar';

import * as S from './styles';

export default function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate('SchedulingDetails')
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
           <S.DateValue />
         </S.DateInfo>
         <ArrowSvg />
         <S.DateInfo>
           <S.DateTitle>ATÉ</S.DateTitle>
           <S.DateValue />
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
       />
     </S.Footer>
   </S.Container>
  );
}