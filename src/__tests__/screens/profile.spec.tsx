import React from 'react';

import { render } from '@testing-library/react-native'; 

import { Profile } from '../../screens/Profile/'; 

describe('Profile Screen', () => {

it('should be show placeholder correctly in user input name ', () => {

  const { getByPlaceholderText } = render (<Profile />); 
  const inputName = getByPlaceholderText('Nome');
  
  expect(inputName).toBeTruthy();  
});

it('should be loaded user data ', () => { 

const { getByTestId } = render (<Profile />); 

  const inputName = getByTestId('input-name'); 
  const inputSurName = getByTestId('input-surname'); 

  expect(inputName.props.value).toEqual('Everton');
  expect(inputSurName.props.value).toEqual('Ferreira');
});

it('should be exist title render', () => {

  const { getByTestId } = render (<Profile />); 

  const textTitle = getByTestId('text-title'); 

  
  expect(textTitle.props.children).toContain('Perfil');

});

}); 