import React, { Component } from 'react';
import Character from './Character';

import './ListCharacters.css';

const URL_CHARACTERS = "http://gateway.marvel.com/v1/public/characters";
const URL_COMICS = "http://gateway.marvel.com/v1/public/comics";

const API_KEY = "b1c1403bcf044b4709effd66741871f0";
const LIMIT = 20;

class ListCharacters extends Component {

	constructor(props) {
		super(props);
		this.state = {
			characters: [],
		};
	}

	getCharacters(data) {
		let listCharacters = [];
		let newCharacter = {};

		console.log(data);
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
		return listCharacters;
	}

	componentDidMount() {
		fetch(`${URL_CHARACTERS}?apikey=${API_KEY}`)
			.then(result => result.json())
			.then(
				(result) => {
					this.setState({
						characters: this.getCharacters(result.data.results),
					});
				},
				(error) => {
					alert("Error while getting marvel data : " + error);
				}
			)
	}


	handleCharacterClick = id => {
		alert(id);
	}

	render() {
		const { characters } = this.state;

		return (
			<div id="listingCharacters">
				{
					characters.map(character =>
						<Character
							id={character.id}
							name={character.name}
							picture={character.picture}
							onClick={this.handleCharacterClick}
							key={character.id}
						/>
					)
				}
			</div>
		)
	}
}

export default ListCharacters;