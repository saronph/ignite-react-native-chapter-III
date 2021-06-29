import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  // onPress?: () => void;
}

export default function Button({ title, color, ...rest }: Props) {
  return (
   <S.Container {...rest} color={color}>
     <S.Title>{title}</S.Title>
   </S.Container>
  );
}