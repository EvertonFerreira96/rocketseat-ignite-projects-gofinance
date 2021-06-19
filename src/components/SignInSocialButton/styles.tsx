import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Button = styled(RectButton)`
    height: ${RFValue(56)}px; 

    background-color: ${({ theme }) => theme.colors.shape}; 
    border-radius:  ${RFValue(5)}px; 

    align-items: center; 
    flex-direction: row; 

    margin: 0 0 ${RFValue(16)}px; 
`;

export const ImageContainer = styled.View`
height: 100%; 

justify-content: center;
align-items: center; 

padding: ${RFValue(16)}px; 

border-color: ${({ theme }) => theme.colors.background}; 
border-right-width: 1px; 

`; 

export const Title = styled.Text`
    flex:1;
    text-align: center;

    color: ${({ theme }) => theme.colors.title}; 

    font-family: ${({ theme }) => theme.fonts.medium}; 
    font-size: ${RFValue(12)}px; 
`; 