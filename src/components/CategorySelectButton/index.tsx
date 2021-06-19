import React from 'react';


import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Category, Icon } from './styles';

interface Props extends RectButtonProps{
    title: string; 
}

const CategorySelectButton: React.FC<Props> = ({title, ...rest}) => {
  return (
    <Container {...rest}>
        <Category>{title}</Category>
        <Icon name="chevron-down" />
    </Container>
  );
}

export default CategorySelectButton;