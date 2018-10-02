import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import 'jsdom-global/register';

import Appearance from '../components/Appearance';


describe('<Appearance />', () => {

	// setup
	let wrapper;
	const onClick = spy();
	beforeEach(() => {
		wrapper = shallow(<Appearance
			id = {1}
			title = 'Comics 1'
			picture = 'pictureComics1.jpg'
			urlCharacters = 'http://myUrlComics1'
			isComics = {true}
			onClick = {onClick} />)
	});

	it('should trigger its `onClick` prop when clicked', () => {
		wrapper.simulate('click');

		expect(onClick).to.have.been.calledOnce();
	})
})