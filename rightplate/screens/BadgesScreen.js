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
import {connect} from 'react-redux';
import {addBadgesAction} from '../actions';
import {getBadges, deleteBadge} from '../services.js';


class Badges extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		};
		this._onRefresh = this._onRefresh.bind(this);
		this.deleteBadgeOnClick = this.deleteBadgeOnClick.bind(this);
		this.props.refreshBadges();
	}

static navigationOptions = {
	title: 'My Places'
};

// wait a second and then refresh
_onRefresh() {
	this.setState({refreshing: true}, () => 
	setTimeout(()=>{
		this.setState({refreshing: false});
		this.props.refreshBadges();
	},1000));
	
}

deleteBadgeOnClick(badge) {
	this.setState({refreshing: true});
	deleteBadge(badge._id, badge._rev).then(this._onRefresh());
	
}

componentWillReceiveProps(props){
	let { params } = props.navigation.state;
	if (params && params.refresh) {
		params.refresh = false;
		this._onRefresh();
	}
}

render() {
	return (
		<ScrollView style={{flex:1}}         refreshControl={
			<RefreshControl
			  refreshing={this.state.refreshing}
			  onRefresh={this._onRefresh.bind(this)}
			/>
		  }>
			<View style={styles.hero}>
				<Icon color="white" name="whatshot" size={62} type="material"/>
				<Text style={styles.heading}>Your Check In's</Text>
			</View>
			{this
				.props
				.badges
				.map((badge, i) => <Card
					key={i}
					title={`Your trip to ${badge.name}`}
					image={{
						uri: 'https://cdn.pixabay.com/photo/2017/11/22/10/51/asian-2970211_1280.jpg'
					}}>
					<Icon 
						onPress={() => this.deleteBadgeOnClick(badge)}
						containerStyle={styles.deleteIcon}
						name = 'delete' />
					<Text>
						{`${badge.plate.plateName}: ${badge.plate.rating}/5` }
					</Text>

				</Card>)
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
	},
	deleteIcon: {
		alignSelf : 'flex-end',
	}
});

const mapStateToProps = state => {
	return {
		badges: state.badges
	};
};

const mapDispatchToProps = dispatch => {
	return {
		refreshBadges: () => {
			getBadges().then(badges => dispatch(addBadgesAction(badges)));
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(Badges);