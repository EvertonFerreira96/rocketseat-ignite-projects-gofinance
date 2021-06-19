import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Content, Icon, Title } from './styles';

interface TransactionTypeButtonProps extends RectButtonProps{
    title: string; 
    type: 'income' | 'outcome'
    isActive: boolean
}

const icons = {
    income: 'arrow-up-circle',
    outcome: 'arrow-down-circle',
}

const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({isActive, title, type, ...rest}) => {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Content isActive={isActive} type={type}>

        <Icon name={icons[type]} type={type} /> 
        <Title>{title}</Title>
      </Content>
    </Container>
  );
}

export default TransactionTypeButton;