import * as React from 'react';
import { Animated, AsyncStorage, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { GET_NEW_MESSAGES } from '../../graphql/subscription';
import MessageMutationComponent from './components/MessageMutationComponent';
import MessageQueryComponent from './components/MessageQueryComponent';
import { MessageScreenState } from './MessageScreen';

export interface user_props {
	id: string;
	email: string;
}

export interface messages_props {
	id: string;
	text: string;
	sender: user_props;
}

export interface MessageScreenProps {
	navigation: any;
}

export interface MessageScreenState {
	messageText: string;
	userId: string;
}

export default class MessageScreen extends React.Component<
	MessageScreenProps,
	MessageScreenState
> {
	chatId: string;
	unsubscribe: any;
	elevation: any;

	static navigationOptions = ({ navigation }: any) => {
		return {
			title: navigation.getParam('friend', 'Friend')
		};
	};

	constructor(props: MessageScreenProps) {
		super(props);
		this.state = {
			messageText: '',
			userId: ''
		};
		this.unsubscribe = null;
		this.chatId = '';
	}

	async componentWillMount() {
		const userId: string = (await AsyncStorage.getItem('USER_ID')) || '';
		this.chatId = this.props.navigation.getParam('chatId');
		this.setState({ userId });
	}

	setInputValue = (item: any) => {
		this.setState({ ...item });
	};

	returnNewMessage = (prev: any, newMessage: messages_props) => ({
		getMessages: {
			...prev,
			messages: [newMessage, ...prev.messages]
		}
	});

	updateQueryFunc = (prev: any, { subscriptionData: { data } }: any) => {
		if (!data) return prev;
		console.log(data.getNewMessages);

		return this.returnNewMessage(prev.getMessages, data.getNewMessages);
	};

	subscribeNew = (subscribeToMore: any) => {
		if (!this.unsubscribe)
			this.unsubscribe = subscribeToMore({
				document: GET_NEW_MESSAGES,
				variables: { chatId: this.chatId },
				updateQuery: this.updateQueryFunc
			});
	};

	createNewMessage = async (create: any) => {
		if (this.state.messageText) {
			const { data } = await create({
				variables: {
					chatId: this.chatId,
					senderId: this.state.userId,
					text: this.state.messageText
				}
			});

			if (!data.createMessage) {
				this.setState({ messageText: '' });
			}
		}
	};

	public render() {
		return (
			<View style={styles.container}>
				<View style={styles.flatListContainer}>
					<MessageQueryComponent
						subscribeNew={this.subscribeNew}
						chatId={this.chatId}
						userId={this.state.userId}
					/>
				</View>
				<MessageMutationComponent
					createNew={this.createNewMessage}
					messageText={this.state.messageText}
					setState={this.setInputValue}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
		// padding: 10
	},
	flatListContainer: {
		flex: 1,
		marginBottom: 20
	}
});
