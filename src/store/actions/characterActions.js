import { DISPLAY_INFO_CHARACTER, ADD_FAVORITE_CHARACTER, DELETE_FAVORITE_CHARACTER } from './actionTypes';

export function displayInfoCharacter(character) {
	return {
		type: DISPLAY_INFO_CHARACTER,
		character: character
	}
};

export function addFavoriteCharacter(character) {
	return {
		type: ADD_FAVORITE_CHARACTER,
		character: character
	}
};

export function deleteFavoriteCharacter(character) {
	return {
		type: DELETE_FAVORITE_CHARACTER,
		character: character
	}
};
