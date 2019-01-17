import { authenticationRef, provider } from './../storeWithFirebase';
import { FETCH_USER } from './types';


export const fetchUser = () => dispatch => {
	authenticationRef.onAuthStateChanged(user => {
		if (user) {
			dispatch({
				type: FETCH_USER,
				payload: user
			});
		} else {
			dispatch({
				type: FETCH_USER,
				payload: null
			});
		}
	});
};

export const signIn = () => () => {
	authenticationRef.signInWithPopup(provider).then(result => { // eslint-disable-line no-unused-vars
		// Sign-in successful.
	}).catch(error => {
		console.log(error);
	});
};

export const signOut = () => () => {
	authenticationRef.signOut().then(() => {
		// Sign-out successful.
	}).catch(error => {
		console.log(error);
	});
};
