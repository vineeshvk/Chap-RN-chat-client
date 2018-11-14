import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
import MessageScreen from './MessageScreen';

const main = createStackNavigator(
	{
		homeScreen: HomeScreen,
		messageScreen: MessageScreen
	},
	{ initialRouteName: 'homeScreen' }
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
