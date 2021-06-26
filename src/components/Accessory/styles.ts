import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: ${(Dimensions.get('window').width - 65) / 3}px;
  height: ${RFValue(92)}px;

  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.colors.background_primary};

  padding: 16px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(13)}px;
`;