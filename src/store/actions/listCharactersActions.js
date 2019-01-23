import { DISPLAY_LIST_CHARACTERS, DISPLAY_LIST_CHARACTERS_WITH_FILTER } from './actionTypes';

function displayListCharacters(listCharacters) {
	return {
		type: DISPLAY_LIST_CHARACTERS,
		listCharacters: listCharacters,
		listCharactersWithFilter: Object.values(listCharacters)
	}
};

export function displayListCharactersWithFilter(listCharacters) {
	return {
		type: DISPLAY_LIST_CHARACTERS_WITH_FILTER,
		listCharactersWithFilter: listCharacters
	}
};

async function callAPIMarvel(url) {
	window.document.body.style.cursor = 'wait';
	try {
		const response = await fetch(`${url}?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`, {
			method: 'GET',
			headers: {
				'Accept-encoding': 'gzip',
			}
		})
		if (!response.ok)
			throw Error(response.statusText);
		const result = await response.json();
		return getFormattedCharacters(result.data.results);
	} catch (error) {
		alert('Error while getting marvel series data : ' + error);
	} finally {
		window.document.body.style.cursor = 'default';
	}
}

function getFormattedCharacters(data){
	let listCharacters = {};
	let newCharacter = {};
	
	data.forEach(character => {
		newCharacter = {
			id: character.id,
			name: character.name,
			description: character.description,
			picture: character.thumbnail.path + '.' +
				character.thumbnail.extension,
			linkComics: character.comics.collectionURI,
			linkSeries: character.series.collectionURI
		};
		listCharacters[newCharacter.name] = newCharacter;
	});
	return listCharacters;
}

function updateListCharactersWithFav(listCharactersDisplayed, listFavCharacters) {
	let  newListCharacters = {};
	const listCharactersDisplayedSorted = Object.values(listCharactersDisplayed).sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
	// favorite
	listCharactersDisplayedSorted.forEach(characterDisplayed => {
		if (listFavCharacters.findIndex(character => character.id === characterDisplayed.id) !== -1)
			newListCharacters[characterDisplayed.name] = Object.assign({}, {...characterDisplayed, isFavorite: true});
	});
	// not favorite
	listCharactersDisplayedSorted.forEach(characterDisplayed => {
		if (!newListCharacters.hasOwnProperty(characterDisplayed.name))
			newListCharacters[characterDisplayed.name] = Object.assign({}, {...characterDisplayed, isFavorite: false});
	});
	return newListCharacters;
}

// Thunks
export const updateListCharactersWithSwitchFav = (listCharacters, favoriteCharactersCollection) => async (dispatch) => {
	const snapshot = await favoriteCharactersCollection;
	const listCharactersWithFav = updateListCharactersWithFav(listCharacters, snapshot.docs.map(d => d.data()));
	dispatch(displayListCharacters(listCharactersWithFav));
};

export const fetchCharacters = (urlDisplayCharacters, listFavCharacters) => async (dispatch) => {
	const listCharacters = await callAPIMarvel(urlDisplayCharacters);
	const listCharactersWithFav = updateListCharactersWithFav(listCharacters, listFavCharacters);
	dispatch(displayListCharacters(listCharactersWithFav));
};
