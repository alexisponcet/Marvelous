import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import authenticationReducer from './authenticationReducer';
import characterReducer from './characterReducer';
import appearanceReducer from './appearanceReducer';


const rootReducer = combineReducers({
	firestore: firestoreReducer,
	authentication: authenticationReducer,
	character: characterReducer,
	appearance: appearanceReducer
});
export default rootReducer;
