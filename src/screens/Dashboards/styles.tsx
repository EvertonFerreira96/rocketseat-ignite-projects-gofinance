import styled, { useTheme } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList, ActivityIndicator as RNActivityIndicator } from 'react-native';
import { InfoListProps } from '.'

import { BorderlessButton } from 'react-native-gesture-handler';


export const Container = styled.View`
  flex: 1; 
    background-color: ${({ theme }) => theme.colors.background}; 
`;

export const Title = styled.Text`
font-size: ${RFValue(18)}px;  
font-family: ${({ theme }) => theme.fonts.regular}; 
font-weight: 700;
color:  ${({ theme }) => theme.colors.dark};
margin-bottom: ${RFValue(16)}px;
`;

export const Header = styled.View`
width: 100%;
height: ${RFPercentage(42)}px;  
background-color: ${({ theme }) => theme.colors.primary}; 
justify-content: flex-start;
align-items: center; 
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<InfoListProps>
).attrs(
  {
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: getBottomSpace()
    }
  }
)``;

export const Transactions = styled.View`
flex:1; 
padding: 0 ${RFValue(24)}px; 
margin-top: ${RFPercentage(12)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
 width: 100%;
 position: absolute; 
 margin-top: ${RFPercentage(20)}px; 
`;


export const LogoutButton = styled(BorderlessButton)``;

export const UserWrapper = styled.View`
    width: 100%;

    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px; 
    
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
 `;

export const UserInfo = styled.View`
flex-direction: row; 
align-items: center;

`;

export const Photo = styled.Image`
width: ${RFValue(48)}px; 
height: ${RFValue(48)}px;  
border-radius: ${RFValue(10)}px; 
`;


export const User = styled.View`
margin: 0 0 0 ${RFValue(16)}px; 
`;

export const UserGretting = styled.Text`
color: ${({ theme }) => theme.colors.shape}; 
font-size: ${RFValue(18)}px;  
font-family: ${({ theme }) => theme.fonts.regular}; 
`;

export const UserName = styled.Text`
color: ${({ theme }) => theme.colors.shape}; 
font-size: ${RFValue(18)}px;  
font-family: ${({ theme }) => theme.fonts.bold}; 
`;

export const Icon = styled(Feather)`
font-size: ${RFValue(24)}px;
color: ${({ theme }) => theme.colors.secondary}; 
`;

export const LoadingContainer = styled.View`
flex:1; 
justify-content: center;
align-items: center;
`;


export const ActivityIndicator = styled(RNActivityIndicator).attrs<RNActivityIndicator>(
  ({ theme }) => (
    {
      size: "large",
      color: theme.colors.secondary
    }))`
`;

