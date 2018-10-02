import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import 'jsdom-global/register';

import SmallCharacter from '../components/SmallCharacter';


describe('<SmallCharacter />', () => {

	// setup
	let wrapper;
	const onClick = spy();
	beforeEach(() => {
		wrapper = shallow(<SmallCharacter
			character={
				{id : 111111,
				name : 'Avengers 1.0',
				description : 'Description Avengers 1.0',
				picture : 'pictureAvengers1.0.jpg',
				linkComics : 'http://myUrlComics',
				linkSeries : 'http://myUrlSeries',
				isFavorite : false}}
			onClick = {onClick} />)
	});


	it('should trigger its `onClick` prop when clicked', () => {
		wrapper.simulate('click');

		expect(onClick).to.have.been.calledOnce();
	})
})