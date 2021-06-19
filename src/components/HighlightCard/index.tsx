import React from 'react';
import { View } from 'react-native';
import { Name } from '../../screens/CategorySelect/styles';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';

interface HighlightCardProps {
    title: string; 
    amount: string; 
    lastTransaction: string; 
    type: 'up' | 'down' | 'total';
}

const icon = { 
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign',
}

const HighlightCard: React.FC<HighlightCardProps> = ({amount, lastTransaction, title, type}) => {
  return (
      <Container type={type}>
          <Header>
              <Title type={type}>{title}</Title>
              <Icon name={icon[type]} type={type} />
          </Header>
          <Footer>
              <Amount type={type}>{amount}</Amount>
              <LastTransaction type={type}>{lastTransaction}</LastTransaction>
          </Footer>
      </Container>
  );
}

export default HighlightCard;