import React, { useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';
import {
  Container,
  Title,
  Transactions,
  Header,
  UserInfo,
  Photo,
  HighlightCards,
  User,
  UserGretting,
  UserWrapper,
  UserName,
  Icon,
  TransactionList,
  LogoutButton,
  LoadingContainer,
  ActivityIndicator
} from './styles';
import { useAuth } from '../../hooks/auth';

export interface InfoListProps extends TransactionCardProps {
  id: number
}

interface HighlightProps {
  amount: string;
  lastTransaction: string
}

interface HighlightData {
  outcome: HighlightProps;
  income: HighlightProps;
  total: HighlightProps;
}


const Dashboards: React.FC = () => {
  const { signOut, user } = useAuth()

  const collectionKey = `@gofinances:transactions_user:${user.id}`;
  
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<InfoListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({
    income: {
      amount: '0',
      lastTransaction: ''
    },
    outcome: {
      amount: '0',
      lastTransaction: ''
    },
    total: {
      amount: '0',
      lastTransaction: ''
    },
  } as HighlightData);

  function getLastTransactionDateByTransactionType(
    collection: InfoListProps[],
    type: 'income' | 'outcome'
  ) {

    const collectionFilttered =  collection
    .filter(transaction => transaction.type === type); 

    if(collectionFilttered.length === 0) 
     return undefined; 

    const lastTransaction =
      Math.max.apply(Math,
          collectionFilttered.map(transaction => new Date(transaction.date).getTime()));

    return lastTransaction;
  }

  async function loadTransactionsCollection() {
    const response = await AsyncStorage.getItem(collectionKey);
    const collections = response ? JSON.parse(response) : [];
    let incomeTotal = 0;
    let outcomeTotal = 0;

    console.log(1)

    const transactionFormatted: InfoListProps[] = collections.map((item: InfoListProps) => {

      if (item.type === "outcome") {
        outcomeTotal += Number(item.amount);
      }
      else {
        incomeTotal += Number(item.amount);
      }
      const amount = Number(item.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount: amount,
        type: item.type,
        category: item.category,
        date
      }
    });

    setTransactions(transactionFormatted);
    console.log(collections)
    const total = incomeTotal - outcomeTotal;
    const lastOutcomeTransactionDate = getLastTransactionDateByTransactionType(collections, 'outcome'); 
    const lastIncomeTransactionDate = getLastTransactionDateByTransactionType(collections, 'income'); 

    setHighlightData({
      income: {
        amount: incomeTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        lastTransaction: lastIncomeTransactionDate ?  Intl.DateTimeFormat('pt-BR', {
          minute: '2-digit',
          hour: '2-digit',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).format( new Date(lastIncomeTransactionDate)) 
        :  ''
      },
      outcome: {
        amount: outcomeTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        lastTransaction: lastOutcomeTransactionDate ? Intl.DateTimeFormat('pt-BR', {
          minute: '2-digit',
          hour: '2-digit',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).format( new Date(lastOutcomeTransactionDate))
        :  ''

      },
      total: {
        amount: total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        lastTransaction: `01 ?? ${Intl.DateTimeFormat('pt-BR',
          {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }

        ).format(getLastTransactionDateByTransactionType(collections, 'outcome'))}`
      }
    });

  }

  useEffect(() => {
    setIsLoading(true);
    loadTransactionsCollection();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, [])

  useFocusEffect(useCallback(() => {
    setIsLoading(true);
    loadTransactionsCollection();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []));

  return (
    <Container>

      {
        isLoading ?
          <LoadingContainer>
            <ActivityIndicator />
          </LoadingContainer> :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{ uri: user.photo ? user.photo : `https://ui-avatars.com/api/?name=${user.name}&background=random&length=2` }} />
                  <User>
                    <UserGretting> Ol??, </UserGretting>
                    <UserName> {user.name} </UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={() => signOut()}>
                  <Icon name='power' />
                </LogoutButton>
              </UserWrapper>
            </Header>
            <HighlightCards>
              <HighlightCard type='up' amount={highlightData.income.amount} title='Entradas' lastTransaction={highlightData.income.lastTransaction ? '??ltima entrada ??s ' + highlightData.income.lastTransaction : 'N??o h?? transa????es'} />
              <HighlightCard type='down' amount={highlightData.outcome.amount} title='Sa??das' lastTransaction={highlightData.outcome.lastTransaction ? '??ltima entrada ??s ' + highlightData.outcome.lastTransaction : 'N??o h?? transa????es'} />
              <HighlightCard type='total' amount={highlightData.total.amount} title='Total' lastTransaction={highlightData.total.lastTransaction} />
            </HighlightCards>
            <Transactions>
              <Title>Listagem</Title>
              <TransactionList
                data={transactions}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item: info }) => <TransactionCard info={info} />}
              />
            </Transactions>
          </>
      }
    </Container>
  )
}

export default Dashboards;
