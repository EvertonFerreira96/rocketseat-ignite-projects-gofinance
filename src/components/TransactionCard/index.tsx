import React from 'react';
import { View } from 'react-native';
import { categories } from '../../utils/categories';

import { 
  Container,
  Title,
  Amount, 
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
 } from './styles';

interface Props{
  info: TransactionCardProps
 }

 export interface TransactionCardProps {
      type: 'income' | 'outcome'; 
      name: string; 
      amount: string;
      date: string; 
      category: string; 
}

const TransactionCard: React.FC<Props> = ({ info: { amount, category, date, name, type }}) => {
  const categoryCollection = categories.find( i => i.key === category)!; 
  return(
    <Container>
        <Title>{name}</Title>
        <Amount type={type}> { type === 'outcome' ? `- ${amount}` :  amount}</Amount>

        <Footer>
          <Category>
            <Icon name={ categoryCollection.icon } />
            <CategoryName>{categoryCollection.name }</CategoryName>
          </Category>

          <Date>{date}</Date>
        </Footer>
    </Container>
  );
}

export default TransactionCard; 