import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import MessageButtonComponent from './MessageButtonComponent';

type Props = {
	messageText: string;
	setState: any;
	createMessage: () => Promise<any>;
};

const TextInputComponent = ({
	messageText,
	setState,
	createMessage
}: Props) => (
	<View style={styles.textInputContainer}>
		<TextInput
			value={messageText}
			onChangeText={messageText => setState({ messageText })}
			returnKeyType="send"
			style={{ width: '80%', fontSize: 15 }}
		/>
		<MessageButtonComponent {...{ createMessage }} />
	</View>
);

const styles = StyleSheet.create({
	textInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#eee'
	}
});

export default TextInputComponent;
