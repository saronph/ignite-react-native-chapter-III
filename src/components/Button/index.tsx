import React from 'react';

import * as S from './styles';

interface Props {
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