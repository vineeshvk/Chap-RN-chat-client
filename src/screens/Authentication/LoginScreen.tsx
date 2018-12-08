import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';
import { GlobalState } from '../../store/store';
import InputComponents from './components/InputComponents';
import MutationComponent from './components/MutationComponent';

export interface LoginProps {
	navigation: any;
}

export interface LoginState {
	email: string;
	password: string;
}

export interface signInArgs {
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
	};
 
	setInputValue = (item: any) => {
		this.setState({ ...item });
	};

	public render() {
		const { container } = styles;
		return (
			<View style={container}>
				<InputComponents
					emailState={this.state.email}
					pwdState={this.state.password}
					setState={this.setInputValue}
				/>
				<Subscribe to={[GlobalState]}>
					{({ authentication }: GlobalState) => (
						<MutationComponent
							{...{ authentication }}
							onPress={this.signInAction}
						/>
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
		justifyContent: 'center',
		padding: 30
	}
});
