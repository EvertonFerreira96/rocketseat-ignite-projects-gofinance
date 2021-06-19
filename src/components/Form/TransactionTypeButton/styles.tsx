import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { View } from 'react-native';

interface IconProps {
    type: 'income' | 'outcome'
}

interface ContainerProps extends IconProps {
    isActive: boolean;
}
export const Container = styled(RectButton) <ContainerProps>`

flex: 0.48; 
  margin: 8px 0 16px; 

`;

export const Content = styled(View) <ContainerProps>`


flex-direction: row; 
  align-items: center; 
  justify-content: center;
  padding: ${RFValue(16)}px;  

  border-width: ${({ type, isActive }) => isActive ? 0 : 1}px; 
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: ${RFValue(5)}px; 

${({ type, isActive }) => isActive && type == 'income' && css`
    background-color: ${({ theme }) => theme.colors.success_light};  
    `}

  ${({ type, isActive }) => isActive && type == 'outcome' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};  
    `}
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px; 
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather) <IconProps>`
    font-size: ${RFValue(24)}px; 
    margin-right: ${RFValue(12)}px; 
    color: ${({ type, theme }) => type === 'outcome' ? theme.colors.attention : theme.colors.success};
`;
