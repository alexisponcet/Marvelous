import { SWITCH_APPEARANCE } from './actionTypes';

export default function switchAppearance(id, url) {
	return {
		type: SWITCH_APPEARANCE,
		id: id,
		url: url
	}
};
