import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import 'jsdom-global/register';

import { DetailCharacter } from './../components/DetailCharacter';


describe('<DetailCharacter />', () => {

	// setup
	let wrapper;
	let instance;
	let character;
	let onClick;
	let set;
	let del;
	let firestore;
	beforeEach(() => {
		character = {
			id : 222222,
			name : 'Avengers 2.0',
			description : 'Description Avengers 2.0',
			picture : 'pictureAvengers2.0.jpg',
			linkComics : 'http://myUrlComics',
			linkSeries : 'http://myUrlSeries',
			isFavorite : false,
		};
		onClick = sinon.spy();
		set = sinon.spy();
		del = sinon.spy();
		firestore = {
			set: set,
			delete: del
		};
		wrapper = shallow(<DetailCharacter
			character={character}
			onClickAppearance={onClick}
			firestore={firestore}
			addFavoriteCharacter={set}
			deleteFavoriteCharacter={del} />);
		instance = wrapper.instance();
	});

	afterEach(() => {
		wrapper.unmount();
	});

	describe('when a character is selected', () => {
		it('should get new data from the selected character', () => {
			instance.componentDidMount();

			// TODO expect callback API
		});

		it('should reset previous data and get new data from the selected' +
			' character', () => {
			const newCharacter = {
				id : 333333,
				name : 'Avengers 3.0',
				description : 'Description Avengers 3.0',
				picture : 'pictureAvengers3.0.jpg',
				linkComics : 'http://myUrlComics',
				linkSeries : 'http://myUrlSeries',
				isFavorite : false,
			};
			const nextProps = {
				character : newCharacter,
				onClickAppearance : onClick,
				firestore : firestore,
				addFavoriteCharacter : set,
				deleteFavoriteCharacter : del,
			};

			instance.componentWillReceiveProps(nextProps);

			// TODO expect callback API
		});

		it('should update the list of comics and series', () => {
			let listComicsBeforeUpdate = [], listSeriesBeforeUpdate = [];
			let listComicsAfterUpdate = [], listSeriesAfterUpdate = [];
			for (let i = 1 ; i <= 10 ; i++){
				let comics = {
					id : i,
					title : 'Appearance ' + i,
					thumbnail: {
						path: 'pathAppearance ' + i,
						extension: 'jpg',
					},
					characters: {
						collectionURI: 'http//myUrl ' + i,
					},
					isComics: true,
				};
				listComicsBeforeUpdate.push(comics);

				let series = JSON.parse(JSON.stringify((comics)));
				series.id = parseInt(series.id + 10);
				series.isComics = false;
				listSeriesBeforeUpdate.push(series);

				let comics2 = JSON.parse(JSON.stringify((comics)));
				delete comics2['thumbnail'];
				delete comics2['characters'];
				comics2.picture = 'pathAppearance ' + i + '.jpg';
				comics2.urlCharacters = 'http//myUrl ' + i;
				listComicsAfterUpdate.push(comics2);

				let series2 = JSON.parse(JSON.stringify((comics2)));
				series2.id = parseInt(series2.id + 10);
				series2.isComics = false;
				listSeriesAfterUpdate.push(series2);
			}
			instance.getComicsOrSeries(listComicsBeforeUpdate, true);
			expect(wrapper.state().comicsAndSeries).to.deep.equal(listComicsAfterUpdate);

			instance.getComicsOrSeries(listSeriesBeforeUpdate, false);
			listSeriesAfterUpdate = [...listComicsAfterUpdate, ...listSeriesAfterUpdate];
			expect(wrapper.state().comicsAndSeries).to.deep.equal(listSeriesAfterUpdate);
		});
	});

	describe('when changing the state of the character (favorite y/n)', () => {
		it('should upgrade/downgrade the caracter', () => {
			instance.changeFavorite();

			expect(wrapper.state().isFavorite).to.equal(true);

			instance.changeFavorite();

			expect(wrapper.state().isFavorite).to.equal(false);
		});
	});
});
