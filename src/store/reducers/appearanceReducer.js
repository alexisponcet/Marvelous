import {
	SWITCH_APPEARANCE,
	DISPLAY_LIST_CHARACTERS,
	DISPLAY_LIST_CHARACTERS_WITH_FILTER
} from './../actions/actionTypes';

export default (state = {id: 0, url: '', listCharacters: {}, listCharactersWithFilter: []}, action) => {
	switch (action.type) {
		case SWITCH_APPEARANCE:
			return {
				...state,
				id: action.id,
				url: action.url
			};
		case DISPLAY_LIST_CHARACTERS:
			return {
				...state,
				listCharacters: action.listCharacters,
				listCharactersWithFilter: action.listCharactersWithFilter
			};
		case DISPLAY_LIST_CHARACTERS_WITH_FILTER:
			return {
				...state,
				listCharactersWithFilter: ((action.listCharactersWithFilter.length > 0) ? action.listCharactersWithFilter : Object.values(state.listCharacters))
				};
		default:
			return state;
	}
};
