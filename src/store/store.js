import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { reduxFirestore } from 'redux-firestore';
import { composeWithDevTools } from 'redux-devtools-extension';

import settings from './../firebase/Settings';
import rootReducer from './reducers/rootReducer';


// Initialize Firebase instance
firebase.initializeApp(settings);

// Initialize Firestore with timeshot firebase
firebase.firestore().settings({ timestampsInSnapshots: true });

const initialState = {
	authentication: null,
	favoriteCharacters: []
};
// Preconfigure firestore store
const createStoreWithFirebase = compose(
	reduxFirestore(firebase),
	applyMiddleware(reduxThunk), // allows us to write action creators that
	// return a function instead of an action
)(createStore);

// Create firestore store
export const store = createStoreWithFirebase(rootReducer, initialState,
	composeWithDevTools());
export const authenticationRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();



/* Local Persistence : redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import favCharactersReducer from '../reducers/favoriteCharacters';
import {createStore} from 'redux';

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel1,
}

const persistedfavCharacterReducer = persistReducer(persistConfig, favCharactersReducer);

export const store = createStore(persistedfavCharacterReducer);
export const persistor = persistStore(store); */
