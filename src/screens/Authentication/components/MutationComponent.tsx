import React from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN_MUTATION } from '../../../graphql/mutation';
import ButtonComponent from './ButtonComponents';

type Props = {
	authentication: any;
	onPress: any;
};
const MutationComponent = ({ authentication, onPress }: Props) => (
	<Mutation mutation={LOGIN_MUTATION}>
		{logIn => (
			<ButtonComponent onPress={() => onPress({ logIn, authentication })} />
		)}
	</Mutation>
);

export default MutationComponent;
