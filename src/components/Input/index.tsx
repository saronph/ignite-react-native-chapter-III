import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import theme from '../../styles/theme';

import * as S from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export default function Input({
  iconName,
  ...rest
}: Props ) {
  return (
    <S.Container >
      <S.IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </S.IconContainer>

      <S.InputText {...rest} />
    </S.Container>
  );
}