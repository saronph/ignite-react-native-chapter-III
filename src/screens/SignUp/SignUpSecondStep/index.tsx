import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard, 
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import BackButton from '../../../components/BackButton';
import Bullet from '../../../components/Bullet';
import Button from '../../../components/Button';
import PasswordInput from '../../../components/PasswordInput';
import api from '../../../services/api';

import * as S from './styles';

interface Params {
  user: {
    name: string,
    email: string,
    driverLicense: string
  }
}

export default function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;
  console.log(user)

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm) {
      Alert.alert('Informe a senha e a confirmação')
    }

    if(password !== passwordConfirm) {
      Alert.alert('As senhas devem ser iguais')
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    }).then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Conta Criada!',
        message: `Agora é só fazer login${'\n'}e aproveitar`
      });
    }).catch((err) => {
      console.log(err)
      Alert.alert('Ocorreu um erro', 'Não foi possível cadastrar.')
    });
  }
  
  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handleBack} />
            <S.BulletWrapper>
              <Bullet active/>
              <Bullet />
            </S.BulletWrapper>
          </S.Header>

          <S.Title>
            Crie sua{'\n'}conta
          </S.Title>
          <S.SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </S.SubTitle>

          <S.Form>
            <S.FormTitle>2. Senha</S.FormTitle>

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName='lock'
              placeholder='Repetir Senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </S.Form>

          <Button title="Cadastrar" color={theme.colors.success} onPress={handleRegister} />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}