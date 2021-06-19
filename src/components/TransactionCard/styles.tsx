import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';


interface TransactionProps {
    type: 'income' | 'outcome'; 
}

export const Container = styled.View`
background-color: ${({theme}) => theme.colors.shape}; 
border-radius: 5px; 
padding: 18px 24px; 
margin-bottom: 16px;
`;

export const Title = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TransactionProps>`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(20)}px;
margin-top:  ${RFValue(2)}px;
color: ${({theme, type}) => 
type === 'outcome' ? theme.colors.attention : theme.colors.success}; 

`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`;

export const Category = styled.View`
flex-direction: row;
    align-items: center;`;

export const Icon = styled(Feather)`
font-size: ${RFValue(20)}px;
color: ${({theme}) => theme.colors.text}; 
`;

export const CategoryName = styled.Text`
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.text};

margin-left: ${RFValue(18)}px;
 `;

export const Date = styled.Text`
font-size: ${RFValue(14)}px;
color: ${({theme}) => theme.colors.text};
`;
