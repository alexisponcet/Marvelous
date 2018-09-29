import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';


ReactDOM.render(
	<Provider store={configureStore()}>
			<App />
	</Provider>,
document.getElementById('root'));
registerServiceWorker();


/* Local Persistence : redux-persist
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/configureStore';

<PersistGate loading={null} persistor={persistor}></PersistGate> */