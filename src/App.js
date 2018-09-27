import React, { Component } from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './App.css';

import Menu from './Menu';
import DetailCharacter from './DetailCharacter';
import ListCharacters from './ListCharacters';

const URL_CHARACTERS = 'http://gateway.marvel.com/v1/public/characters';
export const API_KEY = 'b1c1403bcf044b4709effd66741871f0';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentCharacter: {},
			characters: [],
			characters_filter: [],
			currentAppearanceLink: [],
		};
	}

	componentDidMount() {
		this.callAPIMarvel(URL_CHARACTERS);
	}

	displayInfoAppearance = (linkCharactersFromAppearance) => {
		if (linkCharactersFromAppearance === this.state.currentAppearanceLink)
			return;
		this.setState({ currentAppearanceLink : linkCharactersFromAppearance});
		this.callAPIMarvel(linkCharactersFromAppearance);
	}

	callAPIMarvel = (url) => {
		window.document.body.style.cursor = "wait";
		fetch(`${url}?apikey=${API_KEY}`, {
			method: 'GET',
			headers: {
				'Accept-encoding': 'gzip',
			}
		})
		.then(result => result.json())
		.then(
			(result) => {
				window.document.body.style.cursor = "default";
				this.getCharacters(result.data.results);
			},
			(error) => {
				window.document.body.style.cursor = "default";
				alert("Error while getting marvel character data : " + error);
			}
		)
	}

	getCharacters = (data) => {
		let listCharacters = [];
		let newCharacter = {};

		data.map(character => {
			newCharacter = {
				id : character.id,
				name : character.name,
				description : character.description,
				picture :  character.thumbnail.path + "." +
					character.thumbnail.extension,
				linkComics : character.comics.collectionURI,
				linkSeries : character.series.collectionURI,
			}
			listCharacters.push(newCharacter);
		})
		this.setState({
			characters: listCharacters,
			characters_filter: listCharacters,
		});
	}

	displayInfoCharacter = (idCharacter) => {
		this.setState({ currentCharacter : this.state.characters.find(character => character.id === idCharacter) });
	}

	handleChangeCharacter = (listCharacters) => {
		if (listCharacters.length === 0)
			this.setState({characters_filter: this.state.characters});
		else {
			const newCharacters_filter = [];
			listCharacters.map(character => {
				newCharacters_filter.push(character);
			})
			this.setState({characters_filter: newCharacters_filter});
		}
	}

	render() {
		const { currentCharacter, characters, characters_filter } = this.state;
		const notSelected = Object.keys(currentCharacter).length === 0 && currentCharacter.constructor === Object;

		return (
		  <div id="marvel">
			  {!notSelected ?
			      <DetailCharacter
				      character={currentCharacter}
				      displayInfoAppearance={this.displayInfoAppearance}
			      />
				  :
				  <Menu/>
			  }

		      <ListCharacters characters={characters_filter} onClickCharacter={this.displayInfoCharacter}/>
			  <Typeahead
				  multiple
				  onChange={this.handleChangeCharacter}
				  options={characters}
				  labelKey={option => `${option.name}`}
			  />
		  </div>
		);
	}
}

export default App;
