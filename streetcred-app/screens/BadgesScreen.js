import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	ScrollView,
	RefreshControl
} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

class Badges extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			badges: []
		};
		this.fetchData = this
			.fetchData
			.bind(this);
		this._onRefresh = this
			._onRefresh
			.bind(this);
	}

static navigationOptions = {
	title: 'Badges',
	tabBarIcon: ({tintColor}) => (<Icon type='simple-line-icon' name='badge'/>)
};
_onRefresh() {
	this.setState({refreshing: true});
	this
		.fetchData()
		.then(() => {
			this.setState({refreshing: false});
		});
}

fetchData() {
	return fetch('https://openwhisk.ng.bluemix.net/api/v1/web/rvennam@us.ibm.com_streetcred/street' +
'cred/GetUserBadges?userID=0')
		.then(response => response.json())
		.then((responseJson) => {
			this.setState({badges: responseJson});
		})
		.catch((error) => {
			console.error(error);
			this.setState({badges: []});
		});
}

componentDidMount() {
	return this.fetchData();
}

render() {
	return (
		<ScrollView
			refreshControl={< RefreshControl refreshing = {
				this.state.refreshing
			}
			onRefresh = {
				this._onRefresh
			} />}>
			<View style={styles.hero}>
				<Icon color="white" name="whatshot" size={62} type="material"/>
				<Text style={styles.heading}>Your Badges</Text>
			</View>
			{this
				.state
				.badges
				.map((badge, i) => <Card
					key={i}
					title={`You earned the ${badge.name} badge`}
					image={{
						uri: 'https://cdn.pixabay.com/photo/2017/11/22/10/51/asian-2970211_1280.jpg'
					}}></Card>)
			}
		</ScrollView>
	);
}
}

const styles = StyleSheet.create({
	heading: {
		marginTop: 10,
		fontSize: 22
	},
	hero: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
		backgroundColor: '#dcd7d4'
	}
});

export default Badges;