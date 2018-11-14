import * as React from 'react';
import { Query } from 'react-apollo';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Subscribe } from 'unstated';
import ChatListItemComponent, {
	chat_props
} from '../components/ChatListItemComponent';
import { GET_CHATS } from '../graphql/query';
import { GlobalState } from '../store/store';

export interface HomeScreenProps {
	navigation: any;
}

export interface HomeScreenState {}

export default class HomeScreen extends React.Component<
	HomeScreenProps,
	HomeScreenState
> {
	constructor(props: HomeScreenProps) {
		super(props);
		this.state = {};
	}

	setChatsFunction = (global: any, data: any) => {
		global.setChats(data.getChats);
	};

	public render() {
		const { container } = styles;
		return (
			<View style={container}>
				<Subscribe to={[GlobalState]}>
					{(global: GlobalState) => {
						// console.log('from home', global.state.id);

						if (!global.state.id) return <View />;

						return (
							<Query query={GET_CHATS} variables={{ userId: global.state.id }}>
								{({ data, loading, error }) => {
									console.log('from home', data);
									if (loading) return <Text>asd</Text>;
									if (error) {
										console.log(error);
										return <Text>zzz</Text>;
									}

									return (
										<FlatList
											keyExtractor={(_, i) => `${i}`}
											data={data.getChats}
											renderItem={({ item }: { item: chat_props }) => (
												<ChatListItemComponent
													chat={item}
													navigation={this.props.navigation}
												/>
											)}
										/>
									);
								}}
							</Query>
						);
					}}
				</Subscribe>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		padding: 30
	}
});
