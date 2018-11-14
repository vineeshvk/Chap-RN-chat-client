import * as React from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';

export interface AuthLoadingScreenProps {
	navigation: any;
}

export interface AuthLoadingScreenState {}

export default class AuthLoadingScreen extends React.Component<
	AuthLoadingScreenProps,
	AuthLoadingScreenState
> {
	async componentDidMount() {
		const auth = await AsyncStorage.getItem('USER_ID');
		console.log(auth);
		this.props.navigation.navigate(auth ? 'main' : 'loginScreen');
	}

	public render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		);
	}
}
