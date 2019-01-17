import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import 'jsdom-global/register';

import ListCharacters from './../components/ListCharacters';


describe('<ListCharacter />', () => {

	// setup
	let wrapper;
	let instance;
	let currentCharacter = {
		id : 111111,
		name : 'Avengers 1.0',
		description : 'Description Avengers 1.0',
		picture : 'pictureAvengers1.0.jpg',
		linkComics : 'http://myUrlComics',
		linkSeries : 'http://myUrlSeries',
		isFavorite : false,
	};
	let anotherCharacter = {
		id : 222222,
		name : 'Avengers 2.0',
		description : 'Description Avengers 2.0',
		picture : 'pictureAvengers2.0.jpg',
		linkComics : 'http://myUrlComics',
		linkSeries : 'http://myUrlSeries',
		isFavorite : false,
	};
	const onClick = sinon.spy();
	const noFavoriteCharacter = [];
	const currentAppearanceLink = 'http//myUrl 1';
	beforeEach(() => {
		wrapper = shallow(<ListCharacters
			listFavCharacters={noFavoriteCharacter}
			currentAppearanceLink={currentAppearanceLink}
			currentCharacter={currentCharacter}
			onClickCharacter={onClick} />);
		instance = wrapper.instance();
	});

	afterEach(() => {
		wrapper.unmount();
	});

	describe('when an appearance is selected', () => {
		it('should get new data from the API marvel', () => {
			instance.componentDidMount();

			// TODO expect callback API
		});

		it('should get new data from the selected appearance', () => {
			const newLink = 'http//myUrl 2';
			const nextProps = {
				listFavCharacters : noFavoriteCharacter,
				currentAppearanceLink : newLink,
				currentCharacter : currentCharacter,
				onClickCharacter : onClick,
			};
			instance.componentWillReceiveProps(nextProps);

			// TODO expect callback API
		});

		describe ('with no favorite characters', ()=> {
			it('should match new data and favorite characters list', () => {
				let listCharactersBeforeUpdate = [], listCharactersAfterUpdate = [];
				for (let i = 1 ; i <= 20 ; i++){
					let character = {
						id : i.toString(),
						name : 'Avengers ' + i + '.0',
						description: 'Description Avengers ' + i + '.0',
						thumbnail: {
							path: 'pathAvengers  ' + i,
							extension: 'jpg',
						},
						comics: {
							collectionURI: 'http://myUrlComics ' + i,
						},
						series: {
							collectionURI: 'http://myUrlSeries ' + i,
						},
					};
					listCharactersBeforeUpdate.push(character);

					let characterAfter = JSON.parse(JSON.stringify((character)));
					delete characterAfter['thumbnail'];
					delete characterAfter['comics'];
					delete characterAfter['series'];
					characterAfter.picture = 'pathAvengers  ' + i + '.jpg';
					characterAfter.linkComics = 'http://myUrlComics ' + i;
					characterAfter.linkSeries = 'http://myUrlSeries ' + i;
					characterAfter.isFavorite = false;
					listCharactersAfterUpdate.push(characterAfter);
				}

				instance.getCharacters(listCharactersBeforeUpdate);

				expect(wrapper.state().listCharacters).to.deep.equal(listCharactersAfterUpdate);
				expect(wrapper.state().listCharacters_filter).to.deep.equal(listCharactersAfterUpdate);
				expect(wrapper.state().firstIndexNotFavorite).to.equal(0);
			});
		});

		describe ('with few favorite characters', ()=> {
			it('should match new data and favorite characters list', () => {
				let listCharactersBeforeUpdate = [],
					listCharactersAfterUpdate = [];
				let initialFavoriteCharacter = [];
				for (let i = 1; i <= 20; i++) {
					let character = {
						id: i.toString(),
						name: 'Avengers ' + i + '.0',
						description: 'Description Avengers ' + i + '.0',
						thumbnail: {
							path: 'pathAvengers  ' + i,
							extension: 'jpg',
						},
						comics: {
							collectionURI: 'http://myUrlComics ' + i,
						},
						series: {
							collectionURI: 'http://myUrlSeries ' + i,
						},
					};
					if (i % 2 === 0)
						initialFavoriteCharacter.push(character);
					listCharactersBeforeUpdate.push(character);

					let characterAfter = JSON.parse(JSON.stringify((character)));
					delete characterAfter['thumbnail'];
					delete characterAfter['comics'];
					delete characterAfter['series'];
					characterAfter.picture = 'pathAvengers  ' + i + '.jpg';
					characterAfter.linkComics = 'http://myUrlComics ' + i;
					characterAfter.linkSeries = 'http://myUrlSeries ' + i;
					characterAfter.isFavorite = (i % 2 === 0);
					listCharactersAfterUpdate.push(characterAfter);
				}
				wrapper = shallow(<ListCharacters
					listFavCharacters={initialFavoriteCharacter}
					currentAppearanceLink={currentAppearanceLink}
					currentCharacter={currentCharacter}
					onClickCharacter={onClick}/>);
				instance = wrapper.instance();

				instance.getCharacters(listCharactersBeforeUpdate);

				const listCharactersAfterUpdate_Fav =
					listCharactersAfterUpdate.filter(character => character.isFavorite);
				const listCharactersAfterUpdate_notFav = listCharactersAfterUpdate.filter(character =>
					!character.isFavorite);
				listCharactersAfterUpdate = [...listCharactersAfterUpdate_Fav, ...listCharactersAfterUpdate_notFav];

				expect(wrapper.state().listCharacters).to.deep.equal(listCharactersAfterUpdate);
				expect(wrapper.state().listCharacters_filter).to.deep.equal(listCharactersAfterUpdate);
				expect(wrapper.state().firstIndexNotFavorite).to.equal(10);
			});
		});
	});

	describe('when a favorite character is updated', () => {
		describe('when the current character is upgraded', () => {
			it('should update the visible list of characters', () => {
				instance.setState({
					listCharacters: [currentCharacter, anotherCharacter],
					listCharacters_filter: [currentCharacter, anotherCharacter],
					firstIndexNotFavorite: 0,
				});
				currentCharacter.isFavorite = true;
				const newFavoriteCharacter = [...noFavoriteCharacter, currentCharacter];
				const nextProps = {
					listFavCharacters: newFavoriteCharacter,
					currentAppearanceLink: currentAppearanceLink,
					currentCharacter: currentCharacter,
					onClickCharacter: onClick,
				};

				instance.componentWillReceiveProps(nextProps);

				expect(wrapper.state().firstIndexNotFavorite).to.equal(1);
			});
		});

		describe('when the current character is downgraded', () => {
			it ('should update the visible list of characters -', () => {
				const initialFavoriteCharacter = [currentCharacter];
				wrapper = shallow(<ListCharacters
					listFavCharacters={initialFavoriteCharacter}
					currentAppearanceLink={currentAppearanceLink}
					currentCharacter={currentCharacter}
					onClickCharacter={onClick} />);
				instance = wrapper.instance();
				instance.setState({
					listCharacters : [currentCharacter, anotherCharacter],
					listCharacters_filter: [currentCharacter, anotherCharacter],
					firstIndexNotFavorite: 1,
				});
				currentCharacter.isFavorite = false;
				const newFavoriteCharacter = noFavoriteCharacter;
				const nextProps = {
					listFavCharacters : newFavoriteCharacter,
					currentAppearanceLink : currentAppearanceLink,
					currentCharacter : currentCharacter,
					onClickCharacter : onClick,
				};

				instance.componentWillReceiveProps(nextProps);

				expect(wrapper.state().firstIndexNotFavorite).to.equal(0);
			});
		});
	});

	describe('when a character is selected from the autocomplete input', () => {
		it('should reinitialize the filter', () =>{
			const newListCharacters_filter = [];

			instance.filterTheCharacters(newListCharacters_filter);

			expect(wrapper.state().listCharacters_filter).to.deep.equal(wrapper.state().listCharacters);
		});

		it('should update the filter', () =>{
			const newListCharacters_filter = [currentCharacter];

			instance.filterTheCharacters(newListCharacters_filter);

			expect(wrapper.state().listCharacters_filter).to.deep.equal(newListCharacters_filter);
		});
	});

});
