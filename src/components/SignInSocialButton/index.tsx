import React from 'react';
import { View } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Button, ImageContainer, Title } from './styles';

interface SignInSocialButton extends RectButtonProps{
    title: string; 
    svg: React.FC<SvgProps>;

}

const SignInSocialButton: React.FC<SignInSocialButton> = ({ title, svg: Svg, ...rest }) => {
  return (
    <Button {...rest}>
        <ImageContainer>
            <Svg />
        </ImageContainer>
        <Title>{title}</Title>
    </Button>
  )
}

export default SignInSocialButton;