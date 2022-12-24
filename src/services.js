import axios from 'axios';

import { store } from './store';

import { LOGIN_USER } from './store/users/actionTypes';

export const serviceApi = {
	// fetchLogin(loginPayload) {
	// 	return axios.post('http://localhost:4000/login', loginPayload);
	// },
};

export const logInUser = async (email, password) => {
	axios
		.post('http://localhost:4000/login', {
			email,
			password,
		})
		.then((res) => {
			console.log(res);
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
		role: userData.user.role,
	};
}
