import React from 'react';
import { messages_props } from '../MessageScreen';
import MessageBoxes from './MessageBoxes';

type Props = {
	item: messages_props;
	userId: string;
};

const MessageSeparatorComponent = ({
	item: { sender, text },
	userId
}: Props) => {
	console.log(sender.id);

	return <MessageBoxes sender={sender.id === userId}>{text}</MessageBoxes>;
};
export default MessageSeparatorComponent;
