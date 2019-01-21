import React, { Children, Component } from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import 'jsdom-global/register';
import ReactTestUtils from 'react-dom/test-utils';
import PropTypes from 'prop-types';

import { store } from '../store/store';
import { Home_HOC } from './../components/Home';
import { Home } from './../components/Home';
import Menu from './../components/Menu';
import { DetailCharacter_HOC}  from './../components/DetailCharacter';
import ListCharacters from './../components/ListCharacters';


describe('<Home />', () => {

	// setup
	let wrapper;
	const noFavoriteCharacter = [];
	beforeEach(() => {
		wrapper = shallow (
			<Home listFavCharacters={noFavoriteCharacter} />,
			{ context: { store: store }}
		);
	});

	afterEach(() => {
		wrapper.unmount();
	});


	class MockProvider extends Component {
		getChildContext () {
			return { store: this.props.store };
		}

		render () {
			return Children.only(this.props.children);
		}
		
		static propTypes = {
			store: PropTypes.object.isRequired,
			children: PropTypes.any
		}
	}

	MockProvider.childContextTypes = {
		store: PropTypes.object.isRequired
	};

	it('should receive the store in the context', () => {
		const wrapper = ReactTestUtils.renderIntoDocument(
			<MockProvider store={store}>
				<Home_HOC/>
			</MockProvider>
		);
		const home = ReactTestUtils.findRenderedComponentWithType(wrapper, Home_HOC);
		expect(home.context.store).to.equal(store);
	});

	describe('Structure home', () => {
		describe('when opening home page', () => {
			it('should have a menu and a list of characters', () => {
				expect(wrapper).to.have.descendants(Menu);
				expect(wrapper).not.to.have.descendants(DetailCharacter_HOC);
				expect(wrapper).to.have.descendants(ListCharacters);
			});
		});

		describe('when a character is clicked', () => {
			it('should have the detail of the current character and a list of' +
				' characters', () => {
				// TODO callback

				//expect(wrapper).not.to.have.descendants(Menu);
				//expect(wrapper).to.have.descendants(DetailCharacter_HOC);
				//expect(wrapper).to.have.descendants(ListCharacters);
			});
		});
	});

	describe('when a character is clicked', () => {
		it('should update the current character', () => {
			const newCharacter = {
				id : 111111,
				name : 'Avengers 1.0',
				description : 'Description Avengers 1.0',
				picture : 'pictureAvengers1.0.jpg',
				linkComics : 'http://myUrlComics',
				linkSeries : 'http://myUrlSeries',
				isFavorite : false,
			};

			wrapper.instance().displayInfoCharacter(newCharacter);

			expect(wrapper.state().currentCharacter).to.equal(newCharacter);
		});
	});

	describe('when an appearance is clicked', () => {
		it('should update the current appearance link', () => {
			const newUrl = 'http://';

			wrapper.instance().displayInfoAppearance(newUrl);

			expect(wrapper.state().currentAppearanceLink).to.equal(newUrl);
		});
	});
});
