import DeviceInfo from 'react-native-device-info';
import {Constants} from 'expo';

const baseURL = 'https://openwhisk.ng.bluemix.net/api/v1/web/rvennam@us.ibm.com_streetcred/' +
        'rightplate/';

export const getBadges = () => {
	return fetch(baseURL + 'GetUserBadges?userID=0')
		.then(response => response.json())
		.then((responseJson) => {
			return responseJson;
		})
		.catch((error) => console.error(error));
};

export const deleteBadge = (docId, docRev) => {
	return fetch(baseURL + `DeleteCheckIn?docId=${docId}&docRev=${docRev}`)
		.then(console.log('Deleted, ', console))
		.catch((error) => console.error(error));
};

export const getPlaces = (position) => {
	const {latitude, longitude} = position.coords;

	let prod = Constants.isDevice ? 'prod=true' : '';
	return fetch(baseURL + `GetPlaces?latitude=${latitude}&longitude=${longitude}&${prod}`)
		.then((response) => response.json())
		.catch((error) => console.error(error));
};

export const getStaticMapURI = (latitude, longitude) => {
	return baseURL + `GetStaticMap?latitude=${latitude}&longitude=${longitude}`;
};

export const checkIn= (badge) =>{
	return fetch(baseURL  + 'CheckIn', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({'userID': '0', ...badge})
	})
		.then((response) => response.json().body)
		.catch((error) => console.error(error));
};