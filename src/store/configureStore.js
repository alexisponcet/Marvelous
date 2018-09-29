import { createStore, compose } from 'redux';
import fireReducer from './../reducers/favoriteCharacters';
import { firebaseConfig } from './../config';
import firebase from 'firebase/app';
import 'firebase/firestore'; // important for firestore
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';

export default function configureStore () {
	// Initialize Firebase instance
	firebase.initializeApp(firebaseConfig);

	// Initialize Firestore with timeshot settings
	firebase.firestore().settings({ timestampsInSnapshots: true });

	const createStoreWithMiddleware = compose(
		reactReduxFirebase(firebase),
		reduxFirestore(firebase),
	)(createStore)

	const store = createStoreWithMiddleware(fireReducer);
	return store;
}


// export const store = createStore(favCharactersFirebaseReducer);

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