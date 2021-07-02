import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';

import * as Yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup';

import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CategorySelect from '../CategorySelect';
import Button from '../../components/Form/Button';
import CategorySelectButton from '../../components/CategorySelectButton';
import InputManegementForm from '../../components/Form/InputManegementForm';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypeContainer
} from './styles';
import { useAuth } from '../../hooks/auth';


interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('O Nome é obrigatório'),
    amount: Yup.number().typeError('Informe um valor numérico').positive('O valor necessita ser positivo').required('O Valor é obrigatório'),
})

const Register: React.FC = () => {
    const { user } = useAuth(); 
    // const { navigate } = useNavigation();
    const { 
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema)
    }); 
    const [category, setCategory] = useState({
        key: 'Categoria',
        name: 'Categoria'
    });
    const [transactionType, setTransactionType] = useState('');
    const [categorySelectModel, setCategorySelectModel] = useState(false);


    function handleTransactionType(type: 'income' | 'outcome') {
        setTransactionType(type);
    }
    function handleCloseModalSelectCategory() {
        setCategorySelectModel(false);
    }
    function handleOpenModalSelectCategory() {
        setCategorySelectModel(true);
    }
    async function handleRegister({amount, name}: FormData) {
        
    const collectionKey = `@gofinances:transactions_user:${user.id}`;
        if(!transactionType)
            return Alert.alert('Selecione um tipo de Transação')

        if(category.key ===  'category')
            return Alert.alert('Selecione um tipo de Transação')

        const newTransaction = {
            id: String(uuid.v4()),
            amount, 
            name,
            type: transactionType,
            category: category.key,
            date: new Date()
        }
        try {
            const collections = await AsyncStorage.getItem(collectionKey);
            const transactions = collections ? JSON.parse(collections): [];

            await AsyncStorage.setItem(collectionKey, JSON.stringify([...transactions, newTransaction]));

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
        handleClearFields(); 
      // navigate('Listagem')
    }

    function handleClearFields() {
        setCategory({
            key: 'Categoria',
            name: 'Categoria'
        });
        setTransactionType(''); 
        reset(); 
    }

    return (
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <Container>
                <Header>
                    <Title>
                        Cadastro
                    </Title>
                </Header>
                <Form>
                    <Fields>
                        <InputManegementForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message }
                            />
                        <InputManegementForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message }
                            />
                        <TransactionsTypeContainer>
                            <TransactionTypeButton isActive={transactionType === 'income'} title="Income" type="income" onPress={() => handleTransactionType('income')} />
                            <TransactionTypeButton isActive={transactionType === 'outcome'} title="Outcome" type="outcome" onPress={() => handleTransactionType('outcome')} />
                        </TransactionsTypeContainer>
                        <CategorySelectButton
                            title={category.name}
                            onPress={() => handleOpenModalSelectCategory()}
                            />

                    </Fields>
                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>

                <Modal testID="modal" visible={categorySelectModel} >

                        <CategorySelect
                            category={category}
                            setCategory={setCategory}
                            closeSelectCategory={handleCloseModalSelectCategory}
                            
                            />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
        </>
    );
}

export default Register;
