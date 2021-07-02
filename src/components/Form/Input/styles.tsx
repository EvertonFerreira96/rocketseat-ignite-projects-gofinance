import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface Props {
  active: boolean
}

export const Container = styled(TextInput)<Props>`
  font-family : ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px; 
  color: ${({theme}) => theme.colors.dark};

  background-color: ${({theme}) => theme.colors.shape};

  width: 100%; 

  border-radius: ${RFValue(5)}px; 

  margin-bottom: ${RFValue(8)}px; 
  padding: ${RFValue(16)}px ${RFValue(18)}px; 

  ${({active, theme }) => active && css`
  border-width: 3px; 
  border-color: ${theme.colors.attention};
  border-style: solid;
  `

  }; 

`;
