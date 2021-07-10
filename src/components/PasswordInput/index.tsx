import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export default function PasswordInput({
  iconName,
  ...rest
}: Props ) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const theme = useTheme();

  function handlePasswordVisible() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <S.Container >
      <S.IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </S.IconContainer>

      <S.InputText secureTextEntry={isPasswordVisible} {...rest} />

      <S.EyeButton onPress={handlePasswordVisible}>
        <S.IconContainer>
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'}            
            size={24}
            color={theme.colors.text_detail}
          />
        </S.IconContainer>
      </S.EyeButton>
    </S.Container>
  );
}