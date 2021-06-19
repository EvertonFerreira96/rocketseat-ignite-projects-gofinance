import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import HistoryCard from '../../components/HistoryCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  LoadingContainer,
  MonthSelectConatiner

} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

export interface InfoListProps extends TransactionCardProps {
  id: number
}

interface AgrupCategory {
  key: string;
  name: string;
  amount: string;
  percentFormatted: string;
  percent: number;
  color: string;
}

const Resume: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const collectionKey = `@gofinances:transactions_user:${user.id}`;
  const [totalByCategories, setTotalByCategories] = useState<AgrupCategory[]>([]);

  async function handleDateChange(action: 'next' | 'previous') {
    if (action === "next")
      setSelectedDate(previous => addMonths(previous, 1));
    else
      setSelectedDate(previous => subMonths(previous, 1));


  }

  async function loadCollectionInfo() {
    setIsLoading(true)

    const response = await AsyncStorage.getItem(collectionKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const totalByCategory: AgrupCategory[] = [];

    const outcomeCollection = responseFormatted.filter((i: InfoListProps) => i.type === 'outcome'
      && new Date(i.date).getMonth() === selectedDate.getMonth()
      && new Date(i.date).getFullYear() === selectedDate.getFullYear()
    );

    const outcomeTotal = outcomeCollection.reduce((accumulador: number, item: AgrupCategory) => {
      return accumulador + Number(item.amount);
    }, 0);

    categories.forEach(category => {
      let categorySum = 0


      outcomeCollection.forEach((outcome: InfoListProps) => {
        if (outcome.category === category.key) {
          categorySum += Number(outcome.amount)
        }
      })
      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          amount: categorySum.toLocaleString(
            'pt-BR',
            {
              style: 'currency',
              currency: 'BRL'
            }),
          percent: (categorySum / outcomeTotal * 100),
          percentFormatted: `${(categorySum / outcomeTotal * 100).toFixed(2)}%`
        })
      }
    });
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadCollectionInfo();
  }, [selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <MonthSelectConatiner>

        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('previous')}>
            <SelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <SelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>
      </MonthSelectConatiner>
      {

        isLoading ?
          <LoadingContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadingContainer>
          :
<>
          <ChartContainer>
          <VictoryPie data={
            totalByCategories
          }
            colorScale={totalByCategories.map(category => category.color)}
            x="percentFormatted"
            y="percent"
            style={{
              labels: {
                fontSize: RFValue(16),
                fontWeight: '700',
                fill: theme.colors.shape
              }
            }}
            labelRadius={80}
          />
        </ChartContainer>
          <Content
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >

            {
              totalByCategories.map(
                i => (
                  <HistoryCard
                    key={i.key}
                    title={i.name}
                    amount={i.amount}
                    color={i.color}

                  />
                )
              )
            }
          </Content>
    </>
      }
      </Container>
  );
}

export default Resume;