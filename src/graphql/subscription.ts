import gql from 'graphql-tag';

export const GET_MESSAGES_FROM_CHAT = gql`
	subscription GetMessages($chatId: String) {
		getMessages(chatId: $chatId) {
			id
			members {
				id
				email
			}
			messages {
				id
				text
				sender {
					id
					email
				}
			}
		}
	}
`;
