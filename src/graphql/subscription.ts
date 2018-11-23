import gql from 'graphql-tag';

export const GET_NEW_MESSAGES = gql`
	subscription GetNewMessages($chatId: String) {
		getNewMessages(chatId: $chatId) {
				id
				text
				sender {
					id
					email
				}
		}
	}
`;
