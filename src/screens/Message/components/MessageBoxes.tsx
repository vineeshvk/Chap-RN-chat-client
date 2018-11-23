import React from 'react';
import { View, StyleSheet } from 'react-native';
import MessageTextBox from './MessageTextBox';

type Props = {
	children: any;
	sender: boolean;
};

const MessageBoxes = ({ children, sender }: Props) => {
	const { messageBoxStyle, senderBox, receiverBox } = styles;
	const additionalStyle = sender ? senderBox : receiverBox;
	const textColor = sender ? '#fff' : '#000';
	const alignItems = sender ? 'flex-end' : 'flex-start';
	return (
		<View style={{ alignItems }}>
			<View style={[additionalStyle, messageBoxStyle]}>
				<MessageTextBox color={textColor}>{children}</MessageTextBox>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	messageBoxStyle: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 100,
		marginBottom: 10,
		marginLeft: 5,
		marginRight: 5
	},
	senderBox: {
		backgroundColor: '#44f'
	},
	receiverBox: {
		backgroundColor: '#eee'
	}
});

export default MessageBoxes;
