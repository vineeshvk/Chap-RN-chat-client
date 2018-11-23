import React from 'react';
import { Query } from 'react-apollo';
import { View } from 'react-native';
import HomeListComponent from './HomeListComponent';
import { GET_CHATS } from '../../../graphql/query';

type Props = {
	userId: string;
	navigation: any;
};

const HomeQueryComponent = ({ userId, navigation }: Props) => {
	if (!userId) return <View />;
	return (
		<Query query={GET_CHATS} variables={{ userId }}>
			{({ data }) => <HomeListComponent data={data} navigation={navigation} />}
		</Query>
	);
};

export default HomeQueryComponent;
