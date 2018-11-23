import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = {
	emailState: string;
	pwdState: string;
	setState: any;
};
const InputComponents = ({ emailState, pwdState, setState }: Props) => (
	<View>
		<TextInput
			label="email"
			value={emailState}
			onChangeText={email => setState({ email })}
			style={{ marginBottom: 20 }}
		/>
		<TextInput
			label="password"
			value={pwdState}
			onChangeText={password => setState({ password })}
		/>
	</View>
);

export default InputComponents;
