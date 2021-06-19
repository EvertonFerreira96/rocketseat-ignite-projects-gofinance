import React from 'react';
import { View } from 'react-native';

import { Container, Title, Amount } from './styles';

interface HistoryCardProps {
    title: string; 
    color: string; 
    amount: string; 
}

const HistoryCard: React.FC<HistoryCardProps> = ({ amount, color, title  }) => {
  return (
      <Container color={color}>
          <Title>{title}</Title>
          <Amount>{amount}</Amount>
      </Container>
  );
}

export default HistoryCard;