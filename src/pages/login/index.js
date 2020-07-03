import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import api from '../../services/api'

export default class Login extends Component {

	constructor(props){
		super(props)

		this.state = {
			email: '',
			password: '',
			error: ''
		}
	}

	handleEmailChange = (email) => {
		this.setState( { email } )
	}

	handlePasswordChange = (password) => {
		this.setState( {password} )
	}

	handleLoginPress = async () => {
		if(this.state.email.length === 0 || this.state.password.length === 0){
			this.setState({ error: "Usuario/Password vazio!"});
		}else{
			const response = await api.post('token', {
				email: this.state.email,
				password: this.state.password
			}).catch(e => {
				this.setState({error: e.message})
			})


			await AsyncStorage.setItem('UserToken', response.data.token)
			
			const navigations = NavigationActions.navigate({ routeName: 'Main' })

			this.props.navigation.dispatch(navigations);

		}
	}

	handleCadastroPress = async () => {
		const navigations = NavigationActions.navigate({ routeName: 'Cadastro' })

		this.props.navigation.dispatch(navigations);
	}

	render() {
	
		return (
			<View> 
		
				<TextInput placeholder="Email"
						   onChangeText={ this.handleEmailChange }
						   autoCorrect={ false }
				/>

				<TextInput placeholder="Senha" 
						   onChangeText={ this.handlePasswordChange }
						   autoCorrect={ false }
						   secureTextEntry
				/>
				

				<Button title="Entrar" onPress={ this.handleLoginPress } />
			    
				<Button title="Cadastrar" onPress= { this.handleCadastroPress } />
			
				<Text>{this.state.error}</Text>

			</View>
		)
	}
}