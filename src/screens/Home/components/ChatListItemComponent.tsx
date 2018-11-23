import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Subscribe } from 'unstated';
import { GlobalState } from '../../../store/store';
import { withNavigation } from 'react-navigation';

export interface chat_props {
	id: string;
	members: Array<{ id: string; email: string }>;
	messages: Array<{ id: string; sender: string; text: string }>;
}

export interface ChatListItemProps {
	chat: chat_props;
	navigation: any;
}
type ReturnMailProp = { id: string };

class ChatListItemComponent extends React.Component<ChatListItemProps> {
	mail: string;

	constructor(props: ChatListItemProps) {
		super(props);
		this.mail = '';
	}

	onPressChat = () => {
		const {
			chat: { messages, id },
			navigation
		} = this.props;

		navigation.navigate('messageScreen', {
			messages,
			chatId: id,
			friend: this.mail
		});
	};

	returnMail = ({ id }: ReturnMailProp) => {
		const { members } = this.props.chat;
		const chatMember = members.filter(item => item.id !== id)[0];
		return chatMember.email;
	};

	render() {
		return (
			<TouchableOpacity onPress={this.onPressChat}>
				<View style={styles.container}>
					<Subscribe to={[GlobalState]}>
						{(global: GlobalState) => {
							this.mail = this.returnMail(global.state);
							return <Text>{this.mail}</Text>;
						}}
					</Subscribe>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderColor: '#ddd',
		borderWidth: 1,
		height: 60,
		justifyContent: 'center',
		paddingLeft: 30,
		borderRadius: 100
	}
});

export default withNavigation(ChatListItemComponent);
