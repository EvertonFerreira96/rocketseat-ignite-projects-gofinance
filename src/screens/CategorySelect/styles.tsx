import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface Category {
    key: string;
    name: string;
}
interface CategoryProps {
  isActive: boolean
}

import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { View } from 'react-native';

export const Container = styled(GestureHandlerRootView)`
  flex:1; 
  background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(114)}px;

  background-color: ${({theme}) => theme.colors.primary};

  align-items: center; 
  justify-content: flex-end;
  padding-bottom: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;  
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(16)}px;
  
  flex-direction: row;
  align-items: center;

  background-color: ${({  isActive, theme }) => isActive ? theme.colors .secondary_light : theme.colors.background };
  `; 

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;  
  margin-right: ${RFValue(16)}px;  
  `; 

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;  
`; 

export const Separator = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.dark};
  `; 
export const Footer = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
  
  `; 

  
