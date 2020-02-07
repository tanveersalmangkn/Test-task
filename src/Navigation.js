import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import {FormContainer} from './Container/form/formContainer'


const navigator  = createStackNavigator({
Form: FormContainer,
})

export const Navigation  = createAppContainer(navigator)