import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import './App.css';
import Menu from './Menu';
import DetailCharacter from './DetailCharacter';
import ListCharacters from './ListCharacters';
import PropTypes from 'prop-types';


const enhance = compose(
	firestoreConnect([
		// Load favorite characters from firestore
		{ collection: 'favoriteCharacters'}
	]),
	connect(
		({ firestore }) => ({
			listFavCharacters: firestore.ordered.favoriteCharacters,
		})
	)
)


class App extends Component {

	URL_CHARACTERS = 'http://gateway.marvel.com/v1/public/characters';

	static propTypes = {
		listFavCharacters: PropTypes.array,
	}

	constructor(props) {
		super(props);

		this.state = {
			listCharacters: [],
			listCharacters_filter: [],
			currentCharacter: {},
			currentAppearanceLink: '',
			firstIndexNotFavorite: -1,
		};
	}

	componentDidMount() {
		this.callAPIMarvel(this.URL_CHARACTERS);
	}

	displayInfoAppearance = (newAppearanceLink) => {
		if (newAppearanceLink === this.state.currentAppearanceLink)
			return;

		// Display the characters associated to the new appearance
		this.setState({ currentAppearanceLink : newAppearanceLink});
		this.callAPIMarvel(newAppearanceLink);
	}

	callAPIMarvel = (url) => {
		window.document.body.style.cursor = 'wait';
		fetch(`${url}?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`, {
			method: 'GET',
			headers: {
				'Accept-encoding': 'gzip',
			}
		})
		.then(result => result.json())
		.then(
			(result) => {
				window.document.body.style.cursor = 'default';
				this.getCharacters(result.data.results);
			},
			(error) => {
				window.document.body.style.cursor = 'default';
				alert("Error while getting marvel character data : " + error);
			}
		)
	}

	getCharacters = (data) => {
		const { listFavCharacters } = this.props;

		let listCharacters = [];
		let newCharacter = {};
		let isFavorite;
		let index, firstIndexNotFavorite = 0;

		data.map(character => {
			newCharacter = {
				id: character.id,
				name: character.name,
				description: character.description,
				picture: character.thumbnail.path + "." +
					character.thumbnail.extension,
				linkComics: character.comics.collectionURI,
				linkSeries: character.series.collectionURI,
			}
			isFavorite = (listFavCharacters.find(c => c.id.toString() === newCharacter.id.toString()) !== undefined)
			if (isFavorite) {
				index = firstIndexNotFavorite;
				firstIndexNotFavorite = firstIndexNotFavorite + 1;
			} else
				index = listCharacters.length;
			newCharacter.isFavorite = isFavorite;
			listCharacters.splice(index, 0, newCharacter);
		})
		this.setState({
			listCharacters: listCharacters,
			listCharacters_filter: listCharacters, // reinitialize the filter
			firstIndexNotFavorite : firstIndexNotFavorite,
		});
	}

	displayFavCharactersFirst = (idCharacter, isFavorite) => {
		const {listCharacters_filter, firstIndexNotFavorite} = this.state;

		const currentIndex = listCharacters_filter.findIndex(character =>
			character.id === idCharacter);
		const currentCharacter = listCharacters_filter[currentIndex];

		// Remove the current character from the list
		let newListCharacters_filter = [...listCharacters_filter.slice(0, currentIndex), ...listCharacters_filter.slice(currentIndex + 1)];

		let i, j;
		if (isFavorite) {
			i = 0;
			j = firstIndexNotFavorite;
		} else {
			i = firstIndexNotFavorite - 1;
			j = newListCharacters_filter.length;
		}

		for (; i < j; i++)
			if (currentCharacter.name < newListCharacters_filter[i].name)
				break;

		// Add the current character to the right place in the list
		newListCharacters_filter.splice(i, 0, currentCharacter);
		this.setState({ listCharacters: newListCharacters_filter,
			listCharacters_filter : newListCharacters_filter,
			firstIndexNotFavorite: isFavorite ? firstIndexNotFavorite + 1 :
				firstIndexNotFavorite - 1});
	}

	displayInfoCharacter = (idCharacter) => {
		this.setState({ currentCharacter : this.state.listCharacters.find(character => character.id === idCharacter) });
	}

	filterTheCharacters = (newListCharacters_filter) => {
		// Reinitialize the list of characters
		if (newListCharacters_filter.length === 0)
			this.setState({ listCharacters_filter: this.state.listCharacters});
		// Apply the filter
		else
			this.setState({ listCharacters_filter: newListCharacters_filter});
	}

	render() {
		const { currentCharacter, listCharacters, listCharacters_filter } = this.state;
		const notSelected = Object.keys(currentCharacter).length === 0 && currentCharacter.constructor === Object;

		return (
		  <div id="marvel">
			  {!notSelected ?
			      <DetailCharacter
				      character={currentCharacter}
				      onClickAppearance={this.displayInfoAppearance}
				      onClickFavoriteStar={this.displayFavCharactersFirst}
			      />
				  :
				  <Menu/>
			  }

		      <ListCharacters characters={listCharacters_filter}
		                      onClickCharacter={this.displayInfoCharacter}/>
			  <Typeahead
				  multiple
				  onChange={this.filterTheCharacters}
				  options={listCharacters}
				  labelKey={option => `${option.name}`}
			  />
		  </div>
		);
	}
}
export default enhance(App);

/* React-Redux v1
const mapStateToProps = state => {
	return { listFavCharactersID: state.listFavCharactersID };
};

const App = connect(mapStateToProps)(ConnectedApp);

export default App;*/