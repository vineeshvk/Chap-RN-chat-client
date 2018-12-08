import { ApolloLink, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { StatusBar } from "react-native";
import { Provider } from "unstated";
import Navigator from "./src";

const ADDRESS = "192.168.1.104:4000";

const httpLink = new HttpLink({
	uri: `http://${ADDRESS}`
});

const wsLink = new WebSocketLink({
	uri: `ws://${ADDRESS}/graphql`,
	options: {
		reconnect: true
	}
});

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query);
		return kind === "OperationDefinition" && operation === "subscription";
	},
	wsLink,
	httpLink
);

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
