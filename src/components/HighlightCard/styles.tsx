import styled, {css} from 'styled-components/native';
import { Feather } from '@expo/vector-icons'; 
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
    type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
background-color: ${({type}) => type === 'total' ? ({theme}) => theme.colors.secondary : ({theme}) => theme.colors.shape};
width: ${RFValue(300)}px; 
border-radius: ${RFValue(8)}px; 
padding: ${RFValue(20)}px ${RFValue(24)}px ${RFValue(42)}px ${RFValue(24)}px; 
margin: 0 ${RFValue(16)}px 0 0; 
`;

export const Header = styled.View`
flex-direction: row;
justify-content: space-between;`;

export const Title = styled.Text<TypeProps>`
font-family: ${({theme}) => theme.fonts.regular};
font-size:  ${RFValue(14)}px;

color: ${({type}) => type === 'total' ? ({theme}) => theme.colors.shape : ({theme}) => theme.colors.dark};
`;

export const Icon = styled(Feather)<TypeProps>`
font-size: ${RFValue(40)}px; 
${({type}) => type === 'up' && css`color: ${({theme}) => theme.colors.success};`};
${({type}) => type === 'down' && css`color: ${({theme}) => theme.colors.attention};`};
${({type}) => type === 'total' && css`color: ${({theme}) => theme.colors.shape};`};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
font-family: ${({theme}) => theme.fonts.medium};
font-size:  ${RFValue(32)}px; 

color: ${({type}) => type === 'total' ? ({theme}) => theme.colors.shape : ({theme}) => theme.colors.dark};
 
margin-top:  ${RFValue(38)}px; 

`;
export const LastTransaction = styled.Text<TypeProps>`
font-family: ${({theme}) => theme.fonts.regular};
font-size:  ${RFValue(12)}px; 

color: ${({type}) => type === 'total' ? ({theme}) => theme.colors.shape : ({theme}) => theme.colors.text};

`;