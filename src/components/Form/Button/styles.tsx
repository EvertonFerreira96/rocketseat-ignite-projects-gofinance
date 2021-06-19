import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    background-color: ${({theme}) => theme.colors.secondary};

    border-radius: ${RFValue(5)}px; 

    align-items: center; 
 
    width:100%;
    padding: ${RFValue(18)}px; 

  
`;

export const Title = styled.Text`


    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.shape};
  
`;
