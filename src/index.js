import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';
import { store } from './settings/storeWithFirebase';


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
document.getElementById('root'));
registerServiceWorker();


/* Local Persistence : redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './settings/configureStore';

<PersistGate loading={null} persistor={persistor}></PersistGate> */