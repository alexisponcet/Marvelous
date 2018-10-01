import { authenticationRef, provider } from '../settings/storeWithFirebase';
import { FETCH_USER } from '../constants/actions';


export const fetchUser = () => dispatch => {
	authenticationRef
		.onAuthStateChanged(user => {
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

export const signIn = () => dispatch => {
	authenticationRef
    .signInWithPopup(provider)
    .then(result => {
	    // Sign-in successful.
    })
    .catch(error => {
      console.log(error);
    });
};

export const signOut = () => dispatch => {
	authenticationRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
