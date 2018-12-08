import React from 'react';
import { Query } from 'react-apollo';
import { GET_MESSAGES } from '../../../graphql/query';
import { View } from 'react-native';
import MessageListComponent from './MessageListComponent';

type Props = {
	chatId: string;
	subscribeNew: any;
	userId: string;
};

const MessageQueryComponent = ({ chatId, subscribeNew, userId }: Props) => (
	<Query query={GET_MESSAGES} variables={{ chatId }}>
		{({ data, loading, error, subscribeToMore }) => {
			if (loading || error || data === null) return <View />;
			console.log(data.getMessages.messages);

			subscribeNew(subscribeToMore);

			return (
				<MessageListComponent
					messages={data.getMessages.messages}
					userId={userId}
					unsubscribe={() => subscribeNew(subscribeToMore)}
				/>
			);
		}}
	</Query>
);

export default MessageQueryComponent;
