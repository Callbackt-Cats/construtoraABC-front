import React from 'react'

import { fireEvent, render, waitForElement, screen } from '@testing-library/react'

import Create from '../index.js'

describe('Test for create Component', () => {
    it('Should add new task quen form has been submitted', () => {
        const {getByTestId} = render(<Create/>) //Renderiza 

       fireEvent.click(getByTestId('button-inserir')) //Busca pelo Button


        //------TESTES INCOMPLETOS FEITOS POR MYLLENE-----
        /*const input = screen.getByTestId('form-inserir');
        const input2 = screen.getByTestId('form-email');
        const input3 = screen.getByTestId('form-cpf');

        const button = screen.getByTestId('button-inserir');
        
        fireEvent.change(input, { target: { value: "React Native" } });
        fireEvent.change(input2, { target: { value: "React Native" } });
        fireEvent.change(input3, { target: { value: "React Native" } });

        
        fireEvent.click(getByTestId('button-inserir'))
        
        -------------

        const message = getByTestId('form-inserir');

        fireEvent.change(message, {targe: {value: 'Name Client'}});

        fireEvent.chance(message, {target: {value: "Hello"}});

        expect(message.value).toBe('Hello')
        
        */

    })
})