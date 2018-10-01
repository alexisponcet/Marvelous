import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authentication from './authenticationReducer';


const mainReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	authentication,
})

export default mainReducer;


/* React-Redux v1
import {
	ADD_FAVORITE_CHARACTER,
	REMOVE_FAVORITE_CHARACTER
} from '../constants/actions';

const initialState = {
	listFavCharactersID: [],
};

const favCharactersReducer = (state = initialState, action) => {
	let newFavCharactersID = [];

	switch (action.type) {
		case ADD_FAVORITE_CHARACTER:
			newFavCharactersID = [...state.listFavCharactersID, action.id];
			return { ...state, listFavCharactersID: newFavCharactersID };

		case REMOVE_FAVORITE_CHARACTER:
			const index = state.listFavCharactersID.indexOf(action.idCharacter);
			newFavCharactersID = [...state.listFavCharactersID.slice(0, index),
				...state.listFavCharactersID.slice(index + 1)];
			return { ...state, listFavCharactersID: newFavCharactersID };

		default:
			return state;
	}
};
/*export default favCharactersReducer ;*/