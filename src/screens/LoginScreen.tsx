import * as React from 'react';
import { Mutation } from 'react-apollo';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Subscribe } from 'unstated';
import { LOGIN_MUTATION } from '../graphql/mutation';
import { GlobalState } from '../store/store';

export interface LoginProps {
	navigation: any;
}

export interface LoginState {
	email: string;
	password: string;
}

interface signInArgs {
	logIn: any;
	authentication: (id: string) => Promise<void>;
}

export default class LoginScreen extends React.Component<
	LoginProps,
	LoginState
> {
	constructor(props: LoginProps) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	signInAction = async ({ logIn, authentication }: signInArgs) => {
		const { email, password } = this.state;
		const {
			data: { login }
		} = await logIn({ variables: { email, password } });
		if (login) {
			this.props.navigation.navigate('main');
			await authentication(login);
		}
		return login;
	};

	public render() {
		const { container, button_container } = styles;
		return (
			<View style={container}>
				<TextInput
					label="email"
					value={this.state.email}
					onChangeText={email => this.setState({ email })}
					style={{ marginBottom: 20 }}
				/>
				<TextInput
					label="password"
					value={this.state.password}
					onChangeText={password => this.setState({ password })}
				/>
				<Subscribe to={[GlobalState]}>
					{(global: GlobalState) => (
						<Mutation mutation={LOGIN_MUTATION}>
							{logIn => (
								<View style={button_container}>
									<Button
										mode="outlined"
										onPress={async () => {
											await this.signInAction({
												logIn,
												authentication: global.authentication
											});
										}}
									>
										Login
									</Button>
								</View>
							)}
						</Mutation>
					)}
				</Subscribe>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		justifyContent: 'center',
		padding: 30
	},
	button_container: {
		alignItems: 'center',
		padding: 30
	}
});
