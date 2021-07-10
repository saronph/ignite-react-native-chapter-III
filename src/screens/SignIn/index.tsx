import React, { useState } from 'react';
import { 
  StatusBar, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard 
} from 'react-native';

import theme from '../../styles/theme';

import Button from '../../components/Button';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';

import * as S from './styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <StatusBar 
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <S.Header>
            <S.Title>Estamos{'\n'}quase lá.</S.Title>
            <S.SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </S.SubTitle>
          </S.Header>

          <S.Form>
            <Input 
              iconName='mail'
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput 
              iconName='lock'
              placeholder="Senha"   
              onChangeText={setPassword}
              value={password}       
            />
          </S.Form>

          <S.Footer>
            <Button 
              title="Login"
              onPress={() => {}}
              enabled={false}
              loading={false}
            />
            <Button 
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={() => {}}
              enabled={false}
              loading={false}
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}