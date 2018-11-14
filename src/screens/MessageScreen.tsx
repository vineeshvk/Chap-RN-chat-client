import * as React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { MessageScreenState } from './MessageScreen';
import { Subscription } from 'react-apollo';
import { GET_MESSAGES_FROM_CHAT } from '../graphql/subscription';

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
	messages: Array<messages_props>;
	userID: string;
}

export default class MessageScreen extends React.Component<
	MessageScreenProps,
	MessageScreenState
> {
	chatId: any;

	constructor(props: MessageScreenProps) {
		super(props);
		this.state = {
			messageText: '',
			messages: [],
			userID: ''
		};
	}

	async componentWillMount() {
		// const messages = this.props.navigation.getParam('messages', []);
		const userID: string = (await AsyncStorage.getItem('USER_ID')) || '';
		this.chatId = this.props.navigation.getParam('chatId') || '';
		this.setState({ userID });
	}
	/*
	TODO: arrange the messages as like in a messenger
	*/

	mapMessages = () => {
		return this.state.messages.map(item => {
			return this.messageSeparator(item);
		});
	};

	messageSeparator = (item: messages_props) => {
		const text = ({ color }: any) => <Text style={{ color }}>{item.text}</Text>;
		if (item.sender.id === this.state.userID) {
			return (
				<View style={{ alignItems: 'flex-end' }}>
					<View style={[styles.senderBox, styles.messageBoxStyle]}>
						{text({ color: '#fff' })}
					</View>
				</View>
			);
		}
		return (
			<View style={{ alignItems: 'flex-start' }}>
				<View style={[styles.receiverBox, styles.messageBoxStyle]}>
					{text({ color: '#000' })}
				</View>
			</View>
		);
	};

	public render() {
		console.log('from message screen', this.state.messages);

		return (
			<View style={styles.container}>
				<View style={styles.flatListContainer}>
					{/* FIXME: finally hook the messages with the FLatList*/}
					{/* <FlatList data={this.props.messages} i  /> */}
					<Text>asdf</Text>
					{/* {this.mapMessages()} */}
					<Subscription
						subscription={GET_MESSAGES_FROM_CHAT}
						variables={{ chatId: this.chatId }}
					>
						{({ data, loading, error }) => {
							// if (loading || error)
							// 	console.log(error)
							// 	return <Text>{error}</Text>;
							console.log(error);
							console.log(loading);
							console.log(data);
							return <Text>zsd</Text>;
						}}
					</Subscription>
				</View>
				<View style={styles.textInputContainer}>
					<TextInput
						value={this.state.messageText}
						onChangeText={messageText => this.setState({ messageText })}
						onSubmitEditing={() => []}
						returnKeyType="send"
						style={{ width: '80%' }}
					/>
					<Button onPress={() => []}>Send</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10
	},
	flatListContainer: {
		flex: 1
	},
	textInputContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	messageBoxStyle: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 100,
		marginBottom: 10
	},
	senderBox: {
		backgroundColor: '#44f'
	},
	receiverBox: {
		backgroundColor: '#eee'
	}
});
