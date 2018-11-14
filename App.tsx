import { HttpLink, split, ApolloLink, InMemoryCache } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { StatusBar } from 'react-native';
import { Provider } from 'unstated';
import Navigator from './src';
import { ApolloClient } from 'apollo-client';

const httpLink = new HttpLink({
	uri: 'http://192.168.1.104:4000/'
});

const wsLink = new WebSocketLink({
	uri: `ws://192.168.1.104:5000/`,
	options: {
		reconnect: true
	}
});

const terminatingLink = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return kind === 'OperationDefinition' && operation === 'subscription';
	},
	wsLink,
	httpLink
);

const link = ApolloLink.from([terminatingLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
	cache
});

export default class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Provider>
					<StatusBar backgroundColor="#fff" barStyle="dark-content" />
					<Navigator />
				</Provider>
			</ApolloProvider>
		);
	}
}
