import { FETCH_USER } from '../constants/actions';

export default (state = false, action) => {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || null;
		default:
			return state;
	}
};
