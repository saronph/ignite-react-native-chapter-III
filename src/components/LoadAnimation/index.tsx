import React from 'react';
import LottieView from 'lottie-react-native';

import LoadingCar from '../../assets/loadingCar.json';

import * as S from './styles';

export default function LoadAnimation() {
  return (
    <S.Container>
      <LottieView
        source={LoadingCar}        
        autoPlay
        loop
        style={{height: 200}}
        resizeMode='contain'
      />        
    </S.Container>
  );
}