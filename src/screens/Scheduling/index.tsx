import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Calendar from '../../components/Calendar';

import * as S from './styles';

export default function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate('SchedulingDetails')
  }

  return (
   <S.Container>
     <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
     />
     <S.Header>
       <BackButton color={theme.colors.shape} onPress={() => {}}/>

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
      <Calendar />
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