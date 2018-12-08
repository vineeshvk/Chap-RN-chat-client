import React from 'react';
import { FlatList } from 'react-native';
import ChatListComponent, { chat_props } from './ChatListItemComponent';

type Prop = {
	data: any;
	navigation: any;
};

type RenderItemProp = {
	item: chat_props;
};

const HomeListComponent = ({ data, navigation }: Prop) => (
	<FlatList
		keyExtractor={(_, i) => `${i}`}
		data={data.getChats}
		renderItem={({ item }: RenderItemProp) => (
			<ChatListComponent chat={item} navigation={navigation} />
		)}
	/>
);
export default HomeListComponent;
