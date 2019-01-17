import React, { Component } from 'react';
import styled from 'styled-components';

import SmallCharacter from './SmallCharacter';
import SearchCharacter from './SearchCharacter';
import PropTypes from 'prop-types';


const DisplayCharacters = styled.div`
	/* Positioning */
    position: relative;
    top: 0;
    left: 0;
  
    /* Display & Box Model */
    display: inline-block;
    @media only screen and (max-width: 520px) {
        display: flex;
    }
    overflow-y: auto;
    flex-wrap: wrap;
    width: 100%;
    height: 33vh;
    min-height: 104px;
    max-height: 208px;
    padding: 0;
    border: solid black 4px;
    margin: 0;
    user-select: none;
}
`;

const WrapperCharacters = styled.section`
`;


export default class ListCharacters extends Component {

	static propTypes = {
		listFavCharacters: PropTypes.array,
		currentCharacter: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			description: PropTypes.string,
			picture: PropTypes.string,
			linkComics: PropTypes.string,
			linkSeries: PropTypes.string,
			isFavorite: PropTypes.bool,
		}),
		currentAppearanceLink: PropTypes.string,
		onClickCharacter: PropTypes.func.isRequired,
	}
	
	constructor(props) {
		super(props);

		this.state = {
			listCharacters: [],
			listCharacters_filter: [],
			firstIndexNotFavorite: -1,
			currentAppearanceLink: this.props.currentAppearanceLink,
		};
	}

	componentDidMount() {
		this.callAPIMarvel(this.state.currentAppearanceLink);
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
					alert('Error while getting marvel character data : ' + error);
				}
			);
	}

	getCharacters = (data) => {
		const { listFavCharacters } = this.props;

		let listCharacters = [];
		let newCharacter = {};
		let isFavorite;
		let index, firstIndexNotFavorite = 0;

		data.forEach(character => {
			newCharacter = {
				id: character.id,
				name: character.name,
				description: character.description,
				picture: character.thumbnail.path + '.' +
					character.thumbnail.extension,
				linkComics: character.comics.collectionURI,
				linkSeries: character.series.collectionURI,
			};
			isFavorite = (listFavCharacters.find(c => c.id.toString() === newCharacter.id.toString()) !== undefined);
			if (isFavorite) {
				index = firstIndexNotFavorite;
				firstIndexNotFavorite = firstIndexNotFavorite + 1;
			} else
				index = listCharacters.length;
			newCharacter.isFavorite = isFavorite;
			listCharacters.splice(index, 0, newCharacter);
		});
		this.setState({
			listCharacters: listCharacters,
			listCharacters_filter: listCharacters, // reinitialize the filter
			firstIndexNotFavorite : firstIndexNotFavorite,
		});
	}

	shouldComponentUpdate(nextProps) {
		if ((Object.keys(nextProps.currentCharacter).length === 0 && nextProps.currentCharacter.constructor === Object)
			|| nextProps.listFavCharacters.length !== this.props.listFavCharacters.length
			|| nextProps.currentAppearanceLink !== this.state.currentAppearanceLink)
			return true;
		return false;
	}
	
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.listFavCharacters.length !== this.props.listFavCharacters.length)
			this.updateFavCharactersFirst(nextProps);

		if (nextProps.currentAppearanceLink !== this.props.currentAppearanceLink)
			this.callAPIMarvel(nextProps.currentAppearanceLink);
	}

	updateFavCharactersFirst = (nextProps) => {
		const { currentCharacter } = nextProps;
		const {listCharacters_filter, firstIndexNotFavorite} = this.state;

		const currentIndex = listCharacters_filter.findIndex(character =>
			character.id === currentCharacter.id);

		// Remove the current character from the list
		let newListCharacters_filter = [...listCharacters_filter.slice(0, currentIndex), ...listCharacters_filter.slice(currentIndex + 1)];

		let i, j;
		if (currentCharacter.isFavorite) {
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
			firstIndexNotFavorite: currentCharacter.isFavorite ? firstIndexNotFavorite + 1 :
				firstIndexNotFavorite - 1});
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
		const { onClickCharacter } = this.props;
		const { listCharacters, listCharacters_filter } = this.state;

		return (
			<WrapperCharacters>
				<DisplayCharacters>
					{
						listCharacters_filter.map(character =>
							<SmallCharacter
								character={character}
								onClick={onClickCharacter}
								key={character.id}
							/>
						)
					}
				</DisplayCharacters>
				
				<SearchCharacter
					listCharacters = {listCharacters}
					onChange={this.filterTheCharacters}
				/>
			</WrapperCharacters>
		);
	}
}
