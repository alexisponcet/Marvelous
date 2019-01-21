import { ADD_FAVORITE_CHARACTER, DELETE_FAVORITE_CHARACTER } from './../actions/actionTypes';

export default (state = [], action) => {
	switch (action.type) {
		case ADD_FAVORITE_CHARACTER:
			return [
				...state,
				action.index
			];
		case DELETE_FAVORITE_CHARACTER:
			return state.filter(item => item !== action.index);
	default:
		return state;
	}
};
