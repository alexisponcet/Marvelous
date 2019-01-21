import { DELETE_FAVORITE_CHARACTER } from './actionTypes';

export default function deleteFavoriteCharacter(id) {
	return {
		type: DELETE_FAVORITE_CHARACTER,
		index: id
	}
};
