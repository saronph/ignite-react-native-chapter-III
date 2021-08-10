import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import BackButton from '../../components/BackButton';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';

import * as S from './styles';

export default function Profile() {
  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const { user } = useAuth();
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <S.HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <S.HeaderTitle>Editar Perfil</S.HeaderTitle>
              <S.LogoutButton onPress={handleSignOut} >
                <Feather name="power" size={24} color={theme.colors.shape} />
              </S.LogoutButton>          
            </S.HeaderTop>

            <S.PhotoContainer>
              <S.Photo source={{ uri: 'https://avatars.githubusercontent.com/u/54987514?v=4' }} />
              <S.PhotoButton onPress={() => {}}>
                <Feather 
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </S.PhotoButton>
            </S.PhotoContainer>
          </S.Header>
          <S.Content style={{ marginBottom: useBottomTabBarHeight()}}>
            <S.Options>
              <S.Option 
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <S.OptionTitle active={option === 'dataEdit'}>Dados</S.OptionTitle>
              </S.Option>
              <S.Option 
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <S.OptionTitle active={option === 'passwordEdit'}>Trocar senha</S.OptionTitle>
              </S.Option>
            </S.Options>
            {
              option === 'dataEdit' 
              ? 
              <S.Section>
                <Input 
                  iconName='user'
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input 
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input 
                  iconName='credit-card'
                  placeholder="CNH"
                  keyboardType='numeric'  
                  defaultValue={user.driver_license}              
                />
              </S.Section>
              :
              <S.Section>
              <PasswordInput 
                iconName='lock'
                placeholder="Senha atual"                
              />
              <PasswordInput 
                iconName='lock'
                placeholder="Nova senha"
              />
              <PasswordInput 
                iconName='credit-card'
                placeholder="Repetir senha"             
              />
            </S.Section>
            }
          </S.Content>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}