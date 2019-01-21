import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import { store } from './store/store';


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();

/* Local Persistence : redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './firebase/configureStore';

<PersistGate loading={null} persistor={persistor}></PersistGate> */
