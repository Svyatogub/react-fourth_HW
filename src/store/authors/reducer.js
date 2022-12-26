import { SET_AUTHORS, CREATE_AUTHOR } from './actionTypes';

const authorsInitialState = [];

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case SET_AUTHORS:
			return [...action.payload];
		case CREATE_AUTHOR:
			return [...action.payload];
		default:
			return state;
	}
};
