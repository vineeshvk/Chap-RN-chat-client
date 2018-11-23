import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from './Authentication';
import HomeScreen from './Home';
import AuthLoadingScreen from './AuthLoading';
import MessageScreen from './Message';

const main = createStackNavigator(
	{
		homeScreen: HomeScreen,
		messageScreen: MessageScreen
	},
	{
		initialRouteName: 'homeScreen'
	}
);

export default createSwitchNavigator(
	{
		loginScreen: LoginScreen,
		main,
		authLoading: AuthLoadingScreen
	},
	{
		initialRouteName: 'authLoading'
	}
);
