import { ADD_FAVORITE_CHARACTER } from './actionTypes';

export default function addFavoriteCharacter(id) {
	return {
		type: ADD_FAVORITE_CHARACTER,
		index: id
	}
};
