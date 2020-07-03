import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';

import api from '../../services/api'

export default class Cadastro extends Component {

	constructor(props){
			super(props)

			this.state = {
				email: '',
				password: '',
				error: ''
			}
		}

	handleEmailChange = (email) => {
		this.setState({ email })
	}

	handlePasswordChange = (password) => {
		this.setState( {password} )
	}

	handleUserChange = (user) => {
		this.setState( {user} )
	}



	handleRegisterPress = async () => {
		if(this.state.user.length === 0 || this.state.email.length === 0 || this.state.password.length === 0){
			this.setState({ error: "Preencha todos os campos!"});
		}else{
				await api.post('usuarios',{
					username: this.state.user,
					email: this.state.email,
					password: this.state.password
				 }).catch(e => {
				 	 this.setState({error: e.message})
				 })

			const navigations = NavigationActions.navigate({ routeName: 'Login' })

			this.props.navigation.dispatch(navigations);

				
			
			
		}
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

				<TextInput placeholder="Usuario" 
						   onChangeText={ this.handleUserChange }
						   autoCorrect={ false }
				/>
			    
				<Button title="Cadastrar" onPress={ this.handleRegisterPress } />
			
				<Text>{this.state.error}</Text>
			</View>
		)
	}
}