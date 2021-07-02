import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

interface InputProps extends TextInputProps {
  active ?: boolean;
}

const Input: React.FC<InputProps> = ({ active = false, ...rest}) => {
  return (
      <Container active={active} {...rest}>

      </Container>
  );
}

export default Input;