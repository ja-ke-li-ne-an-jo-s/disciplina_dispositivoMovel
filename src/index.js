import React from 'react';
import {
      createAppContainer
    } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'

import Login from './pages/login'
import Cadastro from './pages/cadastro'
import Main from './pages/main'

const RootStack = createStackNavigator({
	

    Login: {
      screen: Login
    },

	Main: {
		screen: Main
	}, 

    Cadastro: {
      screen: Cadastro
    }

  });

const App = createAppContainer(RootStack);

export default App;