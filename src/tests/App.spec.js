import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Provider } from 'react-redux';
import { store } from './../store/storeWithFirebase';
import App from './../App';


describe('<App />', () => {

	// setup
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Provider store={store}><App/></Provider>);
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it('should render app without crashing', () => {
		expect(wrapper).to.have.descendants(App);
	});
});
