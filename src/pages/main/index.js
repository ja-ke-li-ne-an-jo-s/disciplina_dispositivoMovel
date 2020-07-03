import React, { Component } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet  } from 'react-native';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import api from '../../services/api'

const styles = StyleSheet.create({
	  
	  format: {
		width: 80,
		height: 80,
	  },
});

export default class Main extends Component {

	constructor(props){
		super(props)

		this.state = {
			msg: "Digite um caminho",
			images: [],
			way: ''


		}
	}

	handleWayChange = (way) => {
		this.setState({ way })
	}

	handleGetWayPress = async() => {
		const response = await api.get('fotos/'+this.state.way)

		this.setState({images: response.data})
	}


	render() {
	
		return (
			<View> 
				<Text>{this.state.msg}</Text>
				<TextInput 
					placeholder="Caminho"
					onChangeText={ this.handleWayChange }

				/>

				<Button onPress= { this.handleGetWayPress } title="Buscar" />

				{this.state.images.map((item, key) => (
					<Image
						key={key}
						style={styles.format}
						source={item}
					/>
				))}

				
			
			</View>
		)
	}
}