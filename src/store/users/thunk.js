import axios from 'axios';
import { logInAction } from './actionCreators';

export const logInUser = (email, password) => {
	return (dispatch) => {
		return axios
			.post('http://localhost:4000/login', { email, password })
			.then((res) => {
				console.log(res);
				localStorage.setItem('user', JSON.stringify(res.data.result));
				console.log(localStorage.getItem('user'));
				dispatch(logInAction(userLoginMapper(res.data)));
			})
			.then(dispatch(checkCurrentUser()))
			.catch((e) => console.log(e.message));
	};
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
export const checkCurrentUser = () => {
	return (dispatch) => {
		return (
			axios
				.get('http://localhost:4000/users/me', {
					headers: {
						Authorization: `${localStorage.getItem('user')}`,
					},
				})
				.then((res) => console.log(res))
				// .then((result) => {
				// 	dispatch(logInAction(userLoginMapper(result.data)));
				// })
				.catch((e) => console.log(e.message))
		);
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
