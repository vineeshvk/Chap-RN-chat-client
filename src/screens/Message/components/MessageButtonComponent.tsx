import React from 'react';
import { Button } from 'react-native-paper';

type Props = {
	createMessage: () => Promise<any>;
};

const MessageButtonComponent = ({ createMessage }: Props) => (
	<Button onPress={() => createMessage()}>Send</Button>
);
export default MessageButtonComponent;
