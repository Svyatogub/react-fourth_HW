import axios from 'axios';
import { createCourseAction, setCoursesAction } from './actionCreators';

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
			.post('http://localhost:4000/courses/add', course)
			.then((res) => {
				if (res.status === 201) {
					dispatch(createCourseAction(res.data.result));
				}
			})
			.catch((e) => console.log(e.message));
	};
};
