import React from 'react';
import { FlatList, Animated } from 'react-native';
import MessageSeparatorComponent from './MessageSeparatorComponent';
import { messages_props } from '../MessageScreen';

type Props = {
	userId: string;
	messages: Array<messages_props>;
	unsubscribe: any;
};
const MessageListComponent = ({ messages, userId, unsubscribe }: Props) => {
	unsubscribe();
	return (
		<FlatList
			data={messages}
			renderItem={({ item }: { item: messages_props }) => (
				<MessageSeparatorComponent {...{ item, userId }} />
			)}
			keyExtractor={(_, i) => `${i}`}
			inverted
		/>
	);
};

export default MessageListComponent;
