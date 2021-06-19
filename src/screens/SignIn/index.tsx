import React, { useState }  from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useAuth } from '../../hooks/auth';

import AppleIcon from '../../assets/images/apple.svg'; 
import GoogleIcon from '../../assets/images/google.svg'; 
import LogoIcon from '../../assets/images/logo.svg'; 
import SignInSocialButton from '../../components/SignInSocialButton';


import { 
    Container,
    Header,
    Title,
    SignInTitle,
    TitleWrapper,
    Footer, 
    FooterWrapper
 } from './styles';
import { useTheme } from 'styled-components';

const SignIn: React.FC = () => {

  const theme = useTheme();
  const {signInWithGoogle, signInWithApple} = useAuth(); 

  const [isLoading, setIsLoading] = useState(false);

  async function handleSignInWithApple(){
    setIsLoading(true)
    try {
      return await signInWithApple(); 
    } catch (error) {
      Alert.alert('Não foi possível conectar a conta Apple'); 
      setIsLoading(false);
    }
  }

  async function handleSignInWithGoogle(){
    setIsLoading(true)
  try {
    return await signInWithGoogle();
    }
    catch(error){
      console.log(error); 
      Alert.alert('Não foi possível conectar a conta Google'); 
      setIsLoading(false);
    }
  }
  return (
      <Container>
        <Header>
          <TitleWrapper>
            <LogoIcon 
              width={RFValue(120)}
              height={RFValue(68)}
              />
            <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
            </Title>
            <SignInTitle>
            Faça seu login com {'\n'}
            uma das contas abaixo 
            </SignInTitle>
          </TitleWrapper>
        </Header>
        <Footer>
          <FooterWrapper>
            <SignInSocialButton title="Entrar com o Google" svg={GoogleIcon}  onPress={() => handleSignInWithGoogle()} />
            <SignInSocialButton title="Entrar com a Apple" svg={AppleIcon}  onPress={() => handleSignInWithApple()} />
          </FooterWrapper>

        {isLoading && <ActivityIndicator size="small" color={theme.colors.shape} style={{marginTop: 18}} /> }

        </Footer>
      </Container>
  );
}

export default SignIn; 