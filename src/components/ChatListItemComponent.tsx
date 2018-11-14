import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Subscribe } from 'unstated';
import { GlobalState } from '../store/store';
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

class ChatListItemComponent extends React.Component<ChatListItemProps> {
	render() {
		const {
			chat: { members, messages, id }
		} = this.props;

		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('messageScreen', {
						messages,
						chatId: id
					});
				}}
			>
				<View style={styles.container}>
					<Subscribe to={[GlobalState]}>
						{(global: GlobalState) => {
							const chatMember = members.filter(
								item => item.id !== global.state.id
							)[0];
							console.log(chatMember);
							return <Text>{chatMember.email}</Text>;
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
