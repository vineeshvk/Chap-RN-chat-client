import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
	onPress: any;
};

const ButtonComponent = ({ onPress }: any) => (
	<View style={styles.button_container}>
		<Button mode="outlined" onPress={onPress}>
			Login
		</Button>
	</View>
);

const styles = StyleSheet.create({
	button_container: {
		alignItems: 'center',
		padding: 30
	}
});

export default ButtonComponent;
