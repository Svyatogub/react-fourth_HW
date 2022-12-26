import {
	SET_COURSES,
	DELETE_COURSE,
	CREATE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

export const setCoursesAction = (payload) => ({ type: SET_COURSES, payload });
export const createCourseAction = (payload) => ({
	type: CREATE_COURSE,
	payload,
});
export const deleteCourseAction = (payload) => ({
	type: DELETE_COURSE,
	payload,
});
export const updateCourseAction = (payload) => ({
	type: UPDATE_COURSE,
	payload,
});
