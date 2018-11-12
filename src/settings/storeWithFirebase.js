import { createStore, compose, applyMiddleware } from 'redux';
import { firebaseConfig } from './firebase';
import * as firebase from 'firebase';
import 'firebase/firestore'; // important for firestore
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';
import reduxThunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';


// Initialize Firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize Firestore with timeshot settings
firebase.firestore().settings({ timestampsInSnapshots: true });

const initialState = {}
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase),
	reduxFirestore(firebase),
)(createStore)

export const store = createStoreWithFirebase(rootReducer, initialState,
	applyMiddleware(reduxThunk));
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