import {
	SET_COURSES,
	DELETE_COURSE,
	CREATE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case SET_COURSES:
			return [...action.payload];
		case CREATE_COURSE:
			return [...state, action.payload];
		case DELETE_COURSE:
			return [
				...state.filter((item) => {
					return item.id !== action.payload;
				}),
			];
		case UPDATE_COURSE:
			return state.map((course) => {
				if (course.id !== action.payload.id) {
					return course;
				} else {
					return action.payload;
				}
			});
		default:
			return state;
	}
};
