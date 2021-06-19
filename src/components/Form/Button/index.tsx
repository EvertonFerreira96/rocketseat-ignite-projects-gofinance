import React from 'react';

import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
    title: string;
    onPress: () => void; 
} 

const Button: React.FC<ButtonProps> = ({title, onPress, ...rest}) => {
  return (
      <Container {...rest} onPress={onPress}>
        <Title> 
            {title}
        </Title>
      </Container>
  );
}

export default Button;