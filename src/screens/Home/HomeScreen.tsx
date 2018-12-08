import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subscribe } from 'unstated';
import { GlobalState } from '../../store/store';
import HomeQueryComponent from './components/HomeQueryComponent';

export interface HomeScreenProps {
	navigation: any;
}

export default class HomeScreen extends React.Component<HomeScreenProps> {
	static navigationOptions = {
		title: 'Chap',
		header:null
	};

	public render() {
		const { container } = styles;
		return (
			<View style={container}>
				<Subscribe to={[GlobalState]}>
					{(global: GlobalState) => (
						<HomeQueryComponent
							userId={global.state.id}
							navigation={this.props.navigation}
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
