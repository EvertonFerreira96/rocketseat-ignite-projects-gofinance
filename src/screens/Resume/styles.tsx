import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex:1; 

  background-color: ${({theme}) => theme.colors.background};
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



export const MonthSelectConatiner = styled.View`
padding: 0 ${RFValue(24)}px;`;

export const Content = styled.ScrollView`

`; 


export const ChartContainer = styled.View`
width: 100%;
justify-content: center;
align-items: center;`;

export const MonthSelect = styled.View`
width: 100%;
flex-direction: row; 
justify-content: space-between;
align-items: center;

margin: 24px 0 0;

`;

export const MonthSelectButton = styled(BorderlessButton)`

`;

export const SelectIcon = styled(Feather)`
font-size: ${RFValue(24)}px;`; 

export const Month = styled.Text`
font-family: ${({theme}) => theme.fonts.regular};
font-size: ${RFValue(20)}px;
`; 

export const LoadingContainer = styled.View`
flex:1; 
justify-content: center;
align-items: center;
`;

