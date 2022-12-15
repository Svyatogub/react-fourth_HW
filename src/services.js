import axios from 'axios';
import { store } from './store';
import { SET_AUTHORS } from './store/authors/actionTypes';
import { SET_COURSES } from './store/courses/actionTypes';
import { LOGIN_USER } from './store/users/actionTypes';

export const getAllCourses = async () => {
	let courses = await axios
		.get('http://localhost:4000/courses/all')
		.then((response) => {
			store.dispatch({ type: SET_COURSES, payload: response.data.result });
		})
		.catch((e) => {
			console.log(e.message);
		});
	return courses;
};

export const getAllAuthors = async () => {
	let authors = await axios
		.get('http://localhost:4000/authors/all')
		.then((response) => {
			store.dispatch({ type: SET_AUTHORS, payload: response.data.result });
		})
		.catch((e) => console.log(e.message));
	return authors;
};

export const logInUser = async (email, password) => {
	axios
		.post('http://localhost:4000/login', {
			email,
			password,
		})
		.then((res) => {
			console.log(res);
			// props.login(res);
			store.dispatch({ type: LOGIN_USER, payload: userLoginMapper(res.data) });
		})
		.catch((err) => {
			console.log(err);
			alert('oops, invalid password or email');
		});
};

function userLoginMapper(userData) {
	return {
		isAuth: true,
		name: userData.user.name,
		email: userData.user.email,
		token: userData.result,
	};
}
