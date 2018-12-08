import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MessageTextBox = ({ color, children }: any) => (
	<Text style={[{ color }, styles.fontStyle]}>{children}</Text>
);

const styles = StyleSheet.create({
	fontStyle: {
		fontSize: 15
	}
});

export default MessageTextBox;
