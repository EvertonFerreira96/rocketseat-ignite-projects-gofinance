import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  flex:1; 
`;

export const Header = styled.View`
   background-color: ${({theme}) => theme.colors.primary};

   width: 100%;
   height: ${RFValue(114)}px;

   align-items: center;
   justify-content: flex-end; 
   padding-bottom: ${RFValue(19)}px;
`; 

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
    width: 100%; 
    flex: 1;
    padding: ${RFValue(24)}px;
    justify-content: space-between; `; 

export const Fields = styled.View`
`; 

export const TransactionsTypeContainer = styled.View`
flex-direction: row; 
justify-content: space-between;
 
`; 
