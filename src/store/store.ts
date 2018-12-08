import { Container } from 'unstated';
import { AsyncStorage } from 'react-native';

export interface globalState {
	chats: Array<{}>;
	id: string;
	isAuthenticated: boolean;
}

export interface globalStateService {
	authentication: (id: string) => Promise<any>;
	setChats: (chats: []) => any;
}

export class GlobalState extends Container<globalState>
	implements globalStateService {
	state = {
		chats: [],
		id: '',
		isAuthenticated: false
	};

	constructor() {
		super();
		this.getID();
	}

	setChats = (chats: []) => {
		this.setState({ chats });
	};

	getID = async () => {
		const id = await AsyncStorage.getItem('USER_ID');
		if (id) {
			this.setState({ id });
		}
	};

	authentication = async (id: string) => {
		if (id !== '' && id != null) {
			this.setState({ id, isAuthenticated: true });
			await AsyncStorage.setItem('USER_ID', id);
		}
	};
}
