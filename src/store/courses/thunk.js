import axios from 'axios';
import {
	createCourseAction,
	deleteCourseAction,
	setCoursesAction,
	updateCourseAction,
} from './actionCreators';

export const getAllCourses = () => {
	return (dispatch) => {
		return axios
			.get('http://localhost:4000/courses/all')
			.then((res) => {
				dispatch(setCoursesAction(res.data.result));
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
};
export const createNewCourse = (course) => {
	return (dispatch) => {
		return axios
			.post('http://localhost:4000/courses/add', course, {
				headers: {
					Authorization: `${localStorage.getItem('user')}`,
				},
			})
			.then((res) => {
				if (res.status === 201) {
					dispatch(createCourseAction(res.data.result));
				}
			})
			.catch((e) => console.log(e.message));
	};
};
export const updateCourse = (data, courseId) => {
	return (dispatch) => {
		return axios
			.put(`http://localhost:4000/courses/${courseId}`, data, {
				headers: {
					Authorization: `${localStorage.getItem('user')}`,
				},
			})
			.then((res) => {
				res.status === 200 && dispatch(updateCourseAction(res.data.result));
			})
			.catch((e) => console.log(e.message));
	};
};
export const deleteCourse = (courseId) => {
	return (dispatch) => {
		return axios
			.delete(`http://localhost:4000/courses/${courseId}`, {
				headers: {
					Authorization: `${localStorage.getItem('user')}`,
				},
			})
			.then((res) => {
				res.status === 200 && dispatch(deleteCourseAction(courseId));
			})
			.catch((e) => console.log(e.message));
	};
};
