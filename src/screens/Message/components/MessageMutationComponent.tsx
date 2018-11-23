import React from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_MESSAGE } from '../../../graphql/mutation';
import TextInputComponent from './TextInputComponent';

type Props = {
	createNew: (createNew: any) => Promise<any>;
	messageText: string;
	setState: any;
};

const MessageMutationComponent = ({
	createNew,
	messageText,
	setState
}: Props) => {
	return (
		<Mutation mutation={CREATE_MESSAGE}>
			{createMessage => (
				<TextInputComponent
					{...{ messageText, setState }}
					createMessage={() => createNew(createMessage)}
				/>
			)}
		</Mutation>
	);
};

export default MessageMutationComponent;
