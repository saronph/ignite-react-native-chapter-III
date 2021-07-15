import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { 
  StatusBar, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Keyboard, 
  Alert
} from 'react-native';
import * as Yup from 'yup';

import theme from '../../styles/theme';

import Button from '../../components/Button';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

import * as S from './styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um email válido'),
        password: Yup.string().required('A senha é obrigatória')
      });
  
      await schema.validate({ email, password })

      signIn({ email, password });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Erro', error.message);
      } else {
        Alert.alert('Erro na autenticação', error.message);
      }
    }

  }

  async function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

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
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button 
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}