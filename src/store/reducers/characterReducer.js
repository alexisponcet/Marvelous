import {
	DISPLAY_INFO_CHARACTER,
	ADD_FAVORITE_CHARACTER,
	DELETE_FAVORITE_CHARACTER
} from './../actions/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case DISPLAY_INFO_CHARACTER:
			return action.character;
		case ADD_FAVORITE_CHARACTER:
		case DELETE_FAVORITE_CHARACTER:
			return {
				...state,
				isFavorite: !action.character.isFavorite
			};
		default:
			return state;
	}
};
