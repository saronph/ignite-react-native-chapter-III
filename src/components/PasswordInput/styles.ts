import { TextInput } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  height: 55px;
  width: 55px;
  margin-right: 2px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;
`;

export const EyeButton = styled(BorderlessButton)``;