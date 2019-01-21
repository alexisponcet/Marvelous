import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import favoriteCharactersReducer from './favoriteCharacterReducer';
import authenticationReducer from './authenticationReducer';


const rootReducer = combineReducers({
	firestore: firestoreReducer,
	authentication: authenticationReducer,
	favoriteCharacters: favoriteCharactersReducer,
});
export default rootReducer;
