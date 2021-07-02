import React from 'react';
import { render } from '@testing-library/react-native';
import Input from '.';
import { useTheme } from 'styled-components';
import { ThemeProvider } from 'styled-components/native';
import themes from '../../../global/themes';

const Provider: React.FC = ({children}) => (
    <ThemeProvider theme={themes}>
        {children}
    </ThemeProvider>
);

describe('Input Component', () => {
    it('should be have a specifc border color when active', () => {
        const { getByTestId } = render(
        <Input 
            testID="input-email" 
            placeholder="E-mail"
            keyboardType="email-address"
            active={true}
            autoCorrect={false}
            />
        , 
        {
            wrapper: Provider
        }
        ); 
        const inputComponent = getByTestId("input-email");
        expect(inputComponent.props.style[0].borderColor).toEqual(themes.colors.attention);
        expect(inputComponent.props.style[0].borderWidth).toEqual(3);
    });
});