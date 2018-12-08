import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password)
	}
`;

export const CREATE_MESSAGE = gql`
mutation CreateMessage($chatId:String!,$senderId:String!,$text:String!){
  createMessage(chatId:$chatId,senderId:$senderId,text:$text){
    path
    message
  }
}
`