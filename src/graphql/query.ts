import gql from 'graphql-tag';

export const GET_CHATS = gql`
	query GetChats($userId: String) {
		getChats(userId: $userId) {
			id
			members {
				id
				email
			}
		}
	}
`;

export const GET_MESSAGES = gql`
	query GetMessages($chatId: String) {
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
