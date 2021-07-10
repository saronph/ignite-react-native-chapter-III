import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export default function Button({ 
  title, 
  color, 
  enabled = true, 
  loading = false, 
  light = false,
  ...rest 
}: Props) {
  const theme = useTheme();
  
  return (
    <S.Container 
      {...rest} 
      color={color}
      enabled={enabled}
      style={{ opacity: (enabled === false || loading === true ) ? .5 : 1 }}
    >
      { loading 
        ? <ActivityIndicator color={theme.colors.shape} /> 
        : <S.Title light={light}>{title}</S.Title>      
      }
      
    </S.Container>
  );
}