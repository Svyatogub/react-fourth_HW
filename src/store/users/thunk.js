import axios from 'axios';
import { logInAction, logOutAction } from './actionCreators';

export const logInUser = (email, password) => {
	return (dispatch) => {
		return axios
			.post('http://localhost:4000/login', { email, password })
			.then((res) => {
				localStorage.setItem('user', res.data.result);
			})
			.then(() => {
				dispatch(checkCurrentUser());
			})
			.catch((e) => console.log(e.message));
	};
};
function userLoginMapper(userData) {
	return {
		isAuth: true,
		name: userData.name,
		email: userData.email,
		token: userData.result,
		role: userData.role,
	};
}
export const checkCurrentUser = () => {
	return (dispatch) => {
		return axios
			.get('http://localhost:4000/users/me', {
				headers: {
					Authorization: `${localStorage.getItem('user')}`,
				},
			})
			.then((res) => {
				dispatch(logInAction(userLoginMapper(res.data.result)));
			})
			.catch((e) => console.log('checkCurentUser' + e.message));
	};
};
export const logOutUser = (toLogin) => {
	return (dispatch) => {
		return axios
			.delete('http://localhost:4000/logout', {
				headers: {
					Authorization: `${localStorage.getItem('user')}`,
				},
			})
			.then(() => {
				dispatch(logOutAction());
				localStorage.removeItem('user');
			})
			.then(() => toLogin())
			.catch((e) => {
				console.log(e.message);
			});
	};
};
export const registerUser = (newUser) => {
	return () => {
		return axios
			.post('http://localhost:4000/register', newUser)
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e.message);
				alert('something went wrong, make shure all fields are valid');
			});
	};
};
