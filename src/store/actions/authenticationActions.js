import { authenticationRef, provider } from '../store';
import { FETCH_USER } from './actionTypes';


function authenticateUser(user) {
	return {
		type: FETCH_USER,
		user: user
	}
};

// Thunks
export const fetchUser = () => dispatch => {
	authenticationRef.onAuthStateChanged(user => {
		dispatch(authenticateUser(user));
	});
};

export const signIn = () => () => {
	authenticationRef.signInWithPopup(provider).then(() => {
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
