import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import 'jsdom-global/register';

import ListAppearances from './../components/ListAppearances';
import Appearance from './../components/Appearance';
import {Scrollbars} from 'react-custom-scrollbars';


describe('<ListAppearances />', () => {

	// setup
	let wrapper;
	let listComicsAndSeries;
	beforeEach(() => {
		listComicsAndSeries = [{
			id : 1,
			title : 'Comics 1',
			picture : 'pictureComics1.jpg',
			urlCharacters: 'http://myUrlComics1',
			isComics : true,
		}, {
			id : 2,
			title : 'Series 1',
			picture : 'pictureSeries1.jpg',
			urlCharacters: 'http://myUrlSeries1',
			isComics : false,
		}];
		const onClick = spy();
		wrapper = shallow(<ListAppearances
			appearances={listComicsAndSeries}
			onClickAppearance={onClick}/>);
	});

	describe('Structure listAppearance component', () => {
		it('should have a scrollbar', () => {
			const render = spy();

			wrapper.find(Scrollbars).shallow().setProps({renderView: () => render});
			expect(wrapper).to.have.descendants(Scrollbars);
			expect(wrapper.find(Scrollbars)).to.have.lengthOf(1);
		});

		it('should have 2 comics and series', () => {
			expect(wrapper).to.have.descendants(Appearance);
			expect(wrapper.find(Appearance)).to.have.lengthOf(listComicsAndSeries.length);
		});
	});
});
