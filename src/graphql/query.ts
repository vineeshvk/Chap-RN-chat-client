import gql from 'graphql-tag';

export const GET_CHATS = gql`
	query GetChats($userId: String) {
		getChats(userId: $userId) {
			id
      members{
        id
        email
      }
		}
	}
`;
